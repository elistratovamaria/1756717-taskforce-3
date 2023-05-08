import { Module } from '@nestjs/common';
import { PlatformTaskRepository } from './platform-task.repository';
import { PlatformTaskController } from './platform-task.controller';
import { PlatformTaskService } from './platform-task.service';
import { TaskCategoryModule } from '../task-category/task-category.module';
import { TaskCommentModule } from '../task-comment/task-comment.module';
import { JwtService } from '@nestjs/jwt';
import { TaskReplyModule } from '../task-reply/task-reply.module';

@Module({
  imports: [
    TaskCategoryModule,
    TaskCommentModule,
    TaskReplyModule
  ],
  controllers: [PlatformTaskController],
  providers: [PlatformTaskService, PlatformTaskRepository, JwtService],
  exports: [PlatformTaskRepository]
})
export class PlatformTaskModule {}
