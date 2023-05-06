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

@Injectable()
export class PlatformTaskService {
  constructor(
    private readonly platformTaskRepository: PlatformTaskRepository,
  ) {}

  public async createTask(dto: CreateTaskDto, tokenPayload?: AccessTokenPayload): Promise<Task> {
    const task = {
      ...dto,
      price: dto.price ?? 0,
      deadline: dayjs(dto.deadline).toDate() ?? null,
      image: dto.image ?? '',
      address: dto.address ?? '',
      tags: dto.tags ?? [],
      status: StatusTask.New,
      userId: tokenPayload.id,
      hasResponse: false,
      replies: []
    };

    const record = new PlatformTaskEntity(task);

    return this.platformTaskRepository.create(record);
  }

  public async getTask(id: number): Promise<Task> {
    return await this.platformTaskRepository.findById(id);
  }

  public async deleteTask(id: number): Promise<void> {
    await this.platformTaskRepository.destroy(id);
  }

  public async getTasks(query: TaskQuery): Promise<Task[]> {
    return this.platformTaskRepository.find(query);
  }

  public async updateTask(id: number, dto: UpdateTaskDto) {
    const task = await this.platformTaskRepository.findById(id);
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
