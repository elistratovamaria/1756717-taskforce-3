import { Module } from '@nestjs/common';
import { TaskReplyService } from './task-reply.service';
import { TaskReplyRepository } from './task-reply.repository';

@Module({
  providers: [TaskReplyService, TaskReplyRepository],
  exports: [TaskReplyService]
})
export class TaskReplyModule {}
