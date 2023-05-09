import dayjs from 'dayjs';
import { BadRequestException, ForbiddenException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { RabbitRouting, StatusTask, UserRole } from '@project/shared/shared-types';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from '@project/shared/shared-types';
import { PlatformTaskRepository } from './platform-task.repository';
import { PlatformTaskEntity } from './platform-task.entity';
import { TaskQuery } from './query/task.query';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskException } from './platform-task.constant';
import { JwtService } from '@nestjs/jwt';
import { TaskCommentRepository } from '../task-comment/task-comment.repository';
import { TaskReplyService } from '../task-reply/task-reply.service';
import { sortByStatus } from '@project/util/util-core';
import { CreateCommentDto } from '../task-comment/dto/create-comment.dto';
import { TaskCommentEntity } from '../task-comment/task-comment.entity';
import { TaskCommentQuery } from '../task-comment/query/task-comment.query';
import { CreateResponseDto } from './dto/create-response.dto';
import { TaskResponseRepository } from '../task-response/task-response.repository';
import { TaskResponseEntity } from '../task-response/task-response.entity';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { rabbitConfig } from '@project/config/config-tasks';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class PlatformTaskService {
  constructor(
    private readonly rabbitClient: AmqpConnection,
    @Inject(rabbitConfig.KEY)
    private readonly rabbitOptions: ConfigType<typeof rabbitConfig>,
    private readonly platformTaskRepository: PlatformTaskRepository,
    private readonly taskCommentRepository: TaskCommentRepository,
    private readonly jwtService: JwtService,
    private readonly taskReplyService: TaskReplyService,
    private readonly taskResponseRepository: TaskResponseRepository
  ) { }

  public async createTask(dto: CreateTaskDto, token?: string): Promise<Task> {
    const user = this.jwtService.decode(token);

    if (!user) {
      throw new UnauthorizedException(TaskException.Unauthorized);
    }

    if (user['role'] !== UserRole.Customer) {
      throw new ForbiddenException(TaskException.Forbidden);
    }

    if (dto.tags) {
      const tags = dto.tags.map((tag) => tag.toLowerCase());
      dto.tags = [...new Set(tags)];
    }

    const task = {
      ...dto,
      price: dto.price ?? 0,
      deadline: dayjs(dto.deadline).toDate() ?? null,
      image: dto.image ?? '',
      address: dto.address ?? '',
      tags: dto.tags ?? [],
      status: StatusTask.New,
      userId: user['sub'],
      hasResponse: false,
      replies: []
    };

    const record = new PlatformTaskEntity(task);

    return this.platformTaskRepository.create(record);
  }

  public async getTask(id: number): Promise<Task> {
    return await this.platformTaskRepository.findById(id);
  }

  public async deleteTask(id: number, token?: string): Promise<void> {
    const user = this.jwtService.decode(token);
    const task = await this.platformTaskRepository.findById(id);

    if (!task) {
      throw new BadRequestException(TaskException.NotExisted);
    }

    if (!user) {
      throw new UnauthorizedException(TaskException.Unauthorized);
    }

    if (user['role'] !== UserRole.Customer) {
      throw new ForbiddenException(TaskException.Forbidden);
    }

    if (user['sub'] !== task.userId) {
      throw new ForbiddenException(TaskException.Forbidden);
    }

    if (task.comments?.length > 0) {
      this.taskCommentRepository.destroyByTaskId(id);
    }

    this.platformTaskRepository.destroy(id);
  }

  public async getNewTasks(query: TaskQuery, token?: string): Promise<Task[]> {
    const user = this.jwtService.decode(token);

    if (!user) {
      throw new UnauthorizedException(TaskException.Unauthorized);
    }

    if (user['role'] !== UserRole.Executor) {
      throw new ForbiddenException(TaskException.Forbidden);
    }

    return this.platformTaskRepository.find(query);
  }

  public async getMyTasks(query: TaskQuery, token?: string): Promise<Task[]> {
    const user = this.jwtService.decode(token);

    if (!user) {
      throw new UnauthorizedException(TaskException.Unauthorized);
    }

    const role = user['role'];
    const { status } = query;

    const tasks = await this.platformTaskRepository.findMyTasks(role, user['sub'], status);

    return role === UserRole.Customer ? tasks
      : sortByStatus(tasks);
  }

  public async updateTask(id: number, dto: UpdateTaskDto, token?: string) {
    const user = this.jwtService.decode(token);
    const task = await this.platformTaskRepository.findById(id);

    if (!task) {
      throw new BadRequestException(TaskException.NotExisted);
    }

    if (!user) {
      throw new UnauthorizedException(TaskException.Unauthorized);
    }

    if (user['role'] !== UserRole.Customer) {
      throw new ForbiddenException(TaskException.Forbidden);
    }

    if (user['sub'] !== task.userId) {
      throw new ForbiddenException(TaskException.Forbidden);
    }

    if (dto.tags) {
      const tags = dto.tags.map((tag) => tag.toLowerCase());
      dto.tags = [...new Set(tags)];
    }

    const taskEntity = new PlatformTaskEntity({ ...task, ...dto });

    return this.platformTaskRepository.update(id, taskEntity);
  }

  public async changeStatus(id: number, dto: UpdateTaskDto, token?: string) {
    const user = this.jwtService.decode(token);
    const task = await this.platformTaskRepository.findById(id);
    const taskEntity = new PlatformTaskEntity({ ...task, ...dto });

    if (!task) {
      throw new BadRequestException(TaskException.NotExisted);
    }

    if (!user) {
      throw new UnauthorizedException(TaskException.Unauthorized);
    }

    if ((task.userId !== user['sub']) && (task.executorId !== user['sub'])) {
      throw new ForbiddenException(TaskException.ChangeStatusRight);
    }

    if ((user['role'] === UserRole.Customer) && (task.status === StatusTask.New) && (dto.status === StatusTask.Cancelled)) {
      return this.platformTaskRepository.update(id, taskEntity);
    } else if ((user['role'] === UserRole.Customer) && (task.status === StatusTask.New) && (dto.status === StatusTask.InProgress)) {
      if (!dto.executorId) {
        throw new BadRequestException(TaskException.NotChooseExecutor);
      }
      const replies = await this.taskReplyService.getRepliesByTask(id);
      const candidats = replies.map((reply) => reply.userId);

      if (!candidats.includes(dto.executorId)) {
        throw new BadRequestException(TaskException.NotExecutorReply);
      }

      const isExecutorBusy = await this.platformTaskRepository.checkExecutorInWork(dto.executorId);

      if (isExecutorBusy) {
        throw new BadRequestException(TaskException.ExecutorBusy);
      }

      return this.platformTaskRepository.update(id, taskEntity);
    } else if ((user['role'] === UserRole.Customer) && (task.status === StatusTask.InProgress) && (dto.status === StatusTask.Done)) {
      return this.platformTaskRepository.update(id, taskEntity);
    } else if ((user['role'] === UserRole.Executor) && (task.status === StatusTask.InProgress) && (dto.status === StatusTask.Failed)) {
      return this.platformTaskRepository.update(id, taskEntity);
    } else {
      throw new BadRequestException(TaskException.IncorrectChangeStatus);
    }
  }

  public async putReply(id: number, token?: string) {
    const user = this.jwtService.decode(token);
    const task = await this.platformTaskRepository.findById(id);

    if (!task) {
      throw new BadRequestException(TaskException.NotExisted);
    }

    if (!user) {
      throw new UnauthorizedException(TaskException.Unauthorized);
    }

    if (user['role'] !== UserRole.Executor) {
      throw new ForbiddenException(TaskException.Forbidden);
    }

    if (task.status !== StatusTask.New) {
      throw new ForbiddenException(TaskException.TaskNotNew);
    }

    return this.taskReplyService.createReply(id, user['sub']);
  }

  public async createComment(dto: CreateCommentDto, taskId: number, token?: string) {
    const user = this.jwtService.decode(token);
    const task = await this.platformTaskRepository.findById(taskId);

    if (!task) {
      throw new BadRequestException(TaskException.NotExisted);
    }

    if (!user) {
      throw new UnauthorizedException(TaskException.Unauthorized);
    }

    const commentEntity = new TaskCommentEntity({ ...dto, userId: user['sub'], taskId });

    return this.taskCommentRepository
      .create(commentEntity);
  }

  public async getComments(query: TaskCommentQuery, taskId: number) {
    const task = await this.platformTaskRepository.findById(taskId);

    if (!task) {
      throw new BadRequestException(TaskException.NotExisted);
    }

    return this.taskCommentRepository.find(query, taskId);
  }

  public async createResponse(dto: CreateResponseDto, userId: string, taskId: number, token?: string) {
    const user = this.jwtService.decode(token);
    const task = await this.platformTaskRepository.findById(taskId);
    const existedResponse = await this.taskResponseRepository.findExisted(taskId, userId);

    if (!user) {
      throw new UnauthorizedException(TaskException.Unauthorized);
    }

    if (!task) {
      throw new BadRequestException(TaskException.NotExisted);
    }

    if (!(task.status === StatusTask.Done)) {
      throw new ForbiddenException(TaskException.Status);
    }

    if (task.executorId !== userId) {
      throw new ForbiddenException(TaskException.Forbidden);
    }

    if (existedResponse) {
      throw new BadRequestException(TaskException.ResponseExists);
    }

    const response = { ...dto, userId, taskId }
    const responseEntity = new TaskResponseEntity(response);

    return this.taskResponseRepository
      .create(responseEntity);
  }

  public async countRating(userId: string) {
    const estimationsSum = await this.taskResponseRepository.countEstimation(userId);
    const responsesAmount = await this.taskResponseRepository.countResponses(userId);
    const failedTasksAmount = await this.platformTaskRepository.countExecutorFailedTasks(userId);
    const rating = Math.ceil((estimationsSum / (responsesAmount + failedTasksAmount)));

    return this.rabbitClient.publish<number>(
      this.rabbitOptions.exchange,
      RabbitRouting.GetAdditionalInfo,
      rating
    );
  }
}
