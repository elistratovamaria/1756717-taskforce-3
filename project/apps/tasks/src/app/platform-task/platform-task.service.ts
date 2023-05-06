import dayjs from 'dayjs';
import { BadRequestException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { AccessTokenPayload, StatusTask, UserRole } from '@project/shared/shared-types';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from '@project/shared/shared-types';
import { PlatformTaskRepository } from './platform-task.repository';
import { PlatformTaskEntity } from './platform-task.entity';
import { TaskQuery } from './query/task.query';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskException } from './platform-task.constant';
import { JwtService } from '@nestjs/jwt';
import { TaskCommentRepository } from '../task-comment/task-comment.repository';

@Injectable()
export class PlatformTaskService {
  constructor(
    private readonly platformTaskRepository: PlatformTaskRepository,
    private readonly taskCommentRepository: TaskCommentRepository,
    private readonly jwtService: JwtService,
  ) {}

  public async createTask(dto: CreateTaskDto, token?: string): Promise<Task> {
    const user = this.jwtService.decode(token);

    if (!token) {
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

    if (!token) {
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

  public async getTasks(query: TaskQuery): Promise<Task[]> {
    return this.platformTaskRepository.find(query);
  }

  public async updateTask(id: number, dto: UpdateTaskDto, token?: string) {
    const user = this.jwtService.decode(token);
    const task = await this.platformTaskRepository.findById(id);

    if (!task) {
      throw new BadRequestException(TaskException.NotExisted);
    }

    if (!token) {
      throw new UnauthorizedException(TaskException.Unauthorized);
    }

    if (user['role'] !== UserRole.Customer) {
      throw new ForbiddenException(TaskException.Forbidden);
    }

    if (user['sub'] !== task.userId) {
      throw new ForbiddenException(TaskException.Forbidden);
    }

    const taskEntity = new PlatformTaskEntity({...task, ...dto});

    return this.platformTaskRepository.update(id, taskEntity);
  }

  public async changeStatus(id: number, dto: UpdateTaskDto, tokenPayload?: AccessTokenPayload) {
    const task = await this.platformTaskRepository.findById(id);
    const taskEntity = new PlatformTaskEntity({...task, ...dto});

    if (!tokenPayload) {
      throw new UnauthorizedException(TaskException.Unauthorized);
    }

    if ((task.userId !==  tokenPayload.id) && (task.executorId !== tokenPayload.id)) {
      throw new ForbiddenException(TaskException.ChangeStatusRight);
    }

    if ((tokenPayload.role === UserRole.Customer) && (task.status === StatusTask.New) && (dto.status === StatusTask.Cancelled)) {
      return this.platformTaskRepository.update(id, taskEntity);
    } else if ((tokenPayload.role === UserRole.Customer) && (task.status === StatusTask.New) && (dto.status === StatusTask.InProgress)) {
      //добавить выбор исполнителя
      return this.platformTaskRepository.update(id, taskEntity);
    } else if ((tokenPayload.role === UserRole.Customer) && (task.status === StatusTask.InProgress) && (dto.status === StatusTask.Done)) {
      return this.platformTaskRepository.update(id, taskEntity);
    } else  if ((tokenPayload.role === UserRole.Executor) && (task.status === StatusTask.InProgress) && (dto.status === StatusTask.Failed)) {
      return this.platformTaskRepository.update(id, taskEntity);
    } else {
      throw new BadRequestException(TaskException.IncorrectChangeStatus);
    }
  }
}
