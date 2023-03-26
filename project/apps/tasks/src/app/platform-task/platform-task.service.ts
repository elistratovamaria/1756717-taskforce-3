import { Injectable } from '@nestjs/common';
import { StatusTask } from '@project/shared/shared-types';
import { CreateTaskDto } from './dto/create-task.dto';
import { PlatformTaskMemoryRepository } from './platform-task-memory.repository';
import { PlatformTaskEntity } from './platform-task.entity';

@Injectable()
export class PlatformTaskService {
  constructor(
    private readonly platformTaskRepository: PlatformTaskMemoryRepository
  ) {}

  public async createTask(dto: CreateTaskDto) {
    const task = {
      ...dto,
      status: StatusTask.New,
    }

    const taskEntity = new PlatformTaskEntity(task);

    return this.platformTaskRepository
      .create(taskEntity);
  }

  public async getTask(id: string) {
    return this.platformTaskRepository.findById(id);
  }
}
