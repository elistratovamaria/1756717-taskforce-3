import { Module } from '@nestjs/common';
import { TaskResponseController } from './task-response.controller';
import { TaskResponseService } from './task-response.service';
import { TaskResponseRepository } from './task-response.repository';
import { PlatformTaskModule } from '../platform-task/platform-task.module';

@Module({
  imports: [PlatformTaskModule],
  controllers: [TaskResponseController],
  providers: [TaskResponseService, TaskResponseRepository],
})
export class TaskResponseModule {}
