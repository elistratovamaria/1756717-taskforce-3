import { Module } from '@nestjs/common';
import { TaskResponseRepository } from './task-response.repository';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [TaskResponseRepository, JwtService],
  exports: [TaskResponseRepository]
})
export class TaskResponseModule {}
