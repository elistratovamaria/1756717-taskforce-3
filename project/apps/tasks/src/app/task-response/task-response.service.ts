import { BadRequestException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { TaskResponseRepository } from './task-response.repository';
import { CreateResponseDto } from './dto/create-response.dto';
import { TaskResponseEntity } from './task-response.entity';
import { PlatformTaskRepository } from '../platform-task/platform-task.repository';
import { TaskResponseException } from './task-response.constant';
import { JwtService } from '@nestjs/jwt';
import { StatusTask } from '@project/shared/shared-types';

@Injectable()
export class TaskResponseService {
  constructor(
    private readonly taskResponseRepository: TaskResponseRepository,
    private readonly platformTaskRepository: PlatformTaskRepository,
    private readonly jwtService: JwtService
  ) {}

  public async createResponse(dto: CreateResponseDto, userId: string, taskId: number, token?: string) {
    const user = this.jwtService.decode(token);
    const task = await this.platformTaskRepository.findById(taskId);
    const existedResponse = await this.taskResponseRepository.findExisted(taskId, userId);

    if (!user) {
      throw new UnauthorizedException(TaskResponseException.Unauthorized);
    }

    if (!task) {
      throw new BadRequestException(TaskResponseException.NotExisted);
    }

    if (!(task.status === StatusTask.Done)) {
      throw new ForbiddenException(TaskResponseException.Status);
    }

    if (task.executorId !== userId) {
      throw new ForbiddenException(TaskResponseException.Forbidden);
    }

    if (existedResponse) {
      throw new BadRequestException(TaskResponseException.ResponseExists);
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

    return (estimationsSum / (responsesAmount + failedTasksAmount));
  }
}
