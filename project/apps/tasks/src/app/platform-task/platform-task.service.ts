import dayjs from 'dayjs';
import { BadRequestException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { StatusTask, UserRole } from '@project/shared/shared-types';
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

@Injectable()
export class PlatformTaskService {
  constructor(
    private readonly platformTaskRepository: PlatformTaskRepository,
    private readonly taskCommentRepository: TaskCommentRepository,
    private readonly jwtService: JwtService,
    private readonly taskReplyService: TaskReplyService
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
}
