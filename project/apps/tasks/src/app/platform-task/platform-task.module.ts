import { Module } from '@nestjs/common';
import { PlatformTaskRepository } from './platform-task.repository';
import { PlatformTaskController } from './platform-task.controller';
import { PlatformTaskService } from './platform-task.service';
import { TaskCategoryModule } from '../task-category/task-category.module';

@Module({
  imports: [TaskCategoryModule],
  controllers: [PlatformTaskController],
  providers: [PlatformTaskService, PlatformTaskRepository]
})
export class PlatformTaskModule {}
