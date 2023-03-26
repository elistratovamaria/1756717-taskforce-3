import { Module } from '@nestjs/common';
import { TaskResponseController } from './task-response.controller';
import { TaskResponseService } from './task-response.service';
import { TaskResponseMemoryRepository } from './task-response-memory.repository';

@Module({
  controllers: [TaskResponseController],
  providers: [TaskResponseService, TaskResponseMemoryRepository],
})
export class TaskResponseModule {}
