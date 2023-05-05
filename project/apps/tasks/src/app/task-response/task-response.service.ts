import { ForbiddenException, Injectable } from '@nestjs/common';
import { TaskResponseRepository } from './task-response.repository';
import { CreateResponseDto } from './dto/create-response.dto';
import { TaskResponseEntity } from './task-response.entity';
import { PlatformTaskRepository } from '../platform-task/platform-task.repository';
import { TaskResponseException } from './task-response.constant';

@Injectable()
export class TaskResponseService {
  constructor(
    private readonly taskResponseRepository: TaskResponseRepository,
    private readonly platformTaskRepository: PlatformTaskRepository
  ) {}

  public async createResponse(dto: CreateResponseDto, userId: string, taskId: number) {
    const response = { ...dto, userId, taskId }
    const responseEntity = new TaskResponseEntity(response);
    const task = await this.platformTaskRepository.findById(taskId);

    if (task.executorId !== userId) {
      throw new ForbiddenException(TaskResponseException.Forbidden);
    }

    return this.taskResponseRepository
      .create(responseEntity);
  }


}
