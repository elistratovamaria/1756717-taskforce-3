import { Injectable } from '@nestjs/common';
import { TaskResponseMemoryRepository } from './task-response-memory.repository';

@Injectable()
export class TaskResponseService {
  constructor(
    private readonly taskResponseRepository: TaskResponseMemoryRepository
  ) {}
}
