import { Module } from '@nestjs/common';
import { PlatformTaskMemoryRepository } from './platform-task-memory.repository.js';
import { PlatformTaskController } from './platform-task.controller';
import { PlatformTaskService } from './platform-task.service';

@Module({
  controllers: [PlatformTaskController],
  providers: [PlatformTaskService, PlatformTaskMemoryRepository]
})
export class PlatformTaskModule {}
