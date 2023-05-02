import { Module } from '@nestjs/common';
import { TaskCommentController } from './task-comment.controller';
import { TaskCommentService } from './task-comment.service';
import { TaskCommentMemoryRepository } from './task-comment-memory.repository';

@Module({
  controllers: [TaskCommentController],
  providers: [TaskCommentService, TaskCommentMemoryRepository],
})
export class TaskCommentModule {}
