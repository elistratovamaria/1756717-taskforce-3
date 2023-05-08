import { Module } from '@nestjs/common';
import { TaskCommentController } from './task-comment.controller';
import { TaskCommentService } from './task-comment.service';
import { TaskCommentRepository } from './task-comment.repository';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [TaskCommentController],
  providers: [TaskCommentService, TaskCommentRepository, JwtService],
  exports: [TaskCommentRepository]
})
export class TaskCommentModule {}
