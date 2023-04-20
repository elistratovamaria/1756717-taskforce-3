import { Injectable } from '@nestjs/common';
import { StatusTask } from '@project/shared/shared-types';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from '@project/shared/shared-types';
import { PlatformTaskRepository } from './platform-task.repository';
import { TaskCategoryRepository } from '../task-category/task-category.repository';
import { PlatformTaskEntity } from './platform-task.entity';
import { TaskQuery } from './query/task.query';

@Injectable()
export class PlatformTaskService {
  constructor(
    private readonly platformTaskRepository: PlatformTaskRepository,
    private readonly taskCategoryRepository: TaskCategoryRepository
  ) {}

  public async createTask(dto: CreateTaskDto): Promise<Task> {
    const task = {
      ...dto,
      price: dto.price ?? 0,
      deadline: dto.deadline ?? null,
      image: dto.image ?? '',
      address: dto.address ?? '',
      tags: dto.tags ?? [],
      status: StatusTask.New,
      userId: ''
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

  async getTasks(query: TaskQuery): Promise<Task[]> {
    return this.platformTaskRepository.find(query);
  }
}
