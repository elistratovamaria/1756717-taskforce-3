import { Module } from '@nestjs/common';
import { TaskResponseController } from './task-response.controller';
import { TaskResponseService } from './task-response.service';
import { TaskResponseRepository } from './task-response.repository';

@Module({
  controllers: [TaskResponseController],
  providers: [TaskResponseService, TaskResponseRepository],
})
export class TaskResponseModule {}
