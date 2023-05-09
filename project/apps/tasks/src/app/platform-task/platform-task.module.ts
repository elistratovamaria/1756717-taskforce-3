import { Module } from '@nestjs/common';
import { PlatformTaskRepository } from './platform-task.repository';
import { PlatformTaskController } from './platform-task.controller';
import { PlatformTaskService } from './platform-task.service';
import { TaskCategoryModule } from '../task-category/task-category.module';
import { TaskCommentModule } from '../task-comment/task-comment.module';
import { JwtService } from '@nestjs/jwt';
import { TaskReplyModule } from '../task-reply/task-reply.module';
import { TaskResponseModule } from '../task-response/task-response.module';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { getRabbitMQOptions } from '@project/util/util-core';

@Module({
  imports: [
    TaskCategoryModule,
    TaskCommentModule,
    TaskReplyModule,
    TaskResponseModule,
    RabbitMQModule.forRootAsync(
      RabbitMQModule,
      getRabbitMQOptions('rabbit')
    )
  ],
  controllers: [PlatformTaskController],
  providers: [PlatformTaskService, PlatformTaskRepository, JwtService],
  exports: [PlatformTaskRepository]
})
export class PlatformTaskModule {}
