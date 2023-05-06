import { Module } from '@nestjs/common';
import { TaskCommentController } from './task-comment.controller';
import { TaskCommentService } from './task-comment.service';
import { TaskCommentRepository } from './task-comment.repository';

@Module({
  controllers: [TaskCommentController],
  providers: [TaskCommentService, TaskCommentRepository],
  exports: [TaskCommentRepository]
})
export class TaskCommentModule {}
