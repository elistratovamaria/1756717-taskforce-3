import { Module } from '@nestjs/common';
import { TaskResponseController } from './task-response.controller';
import { TaskResponseService } from './task-response.service';

@Module({
  controllers: [TaskResponseController],
  providers: [TaskResponseService],
})
export class TaskResponseModule {}
