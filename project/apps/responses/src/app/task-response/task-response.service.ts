import { Injectable } from '@nestjs/common';
import { TaskResponseMemoryRepository } from './task-response-memory.repository';
import { CreateResponseDto } from './dto/create-response.dto';
import { TaskResponseEntity } from './task-response.entity';

@Injectable()
export class TaskResponseService {
  constructor(
    private readonly taskResponseRepository: TaskResponseMemoryRepository
  ) {}

  public async createResponse(dto: CreateResponseDto) {
    const responseEntity = new TaskResponseEntity(dto);

    return this.taskResponseRepository
      .create(responseEntity);
  }
}
