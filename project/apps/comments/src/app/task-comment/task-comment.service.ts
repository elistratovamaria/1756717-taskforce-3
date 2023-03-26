import { Injectable } from '@nestjs/common';
import { TaskCommentMemoryRepository } from './task-comment-memory.repository';

@Injectable()
export class TaskCommentService {
  constructor(
    private readonly taskCommentRepository: TaskCommentMemoryRepository
  ) {}
}
