import { Module } from '@nestjs/common';
import { PlatformTaskController } from './platform-task.controller';
import { PlatformTaskService } from './platform-task.service';

@Module({
  controllers: [PlatformTaskController],
  providers: [PlatformTaskService],
})
export class PlatformTaskModule {}
