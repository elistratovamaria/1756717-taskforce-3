import { Injectable } from '@nestjs/common';
import { TaskReplyRepository } from './task-reply.repository';
import { TaskReplyEntity } from './task-reply.entity';

@Injectable()
export class TaskReplyService {
  constructor(
    private readonly taskReplyRepository: TaskReplyRepository,
  ) {}

  public async createReply(taskId: number, userId: string) {
    const replyEntity = new TaskReplyEntity({taskId: taskId, userId: userId});

    return this.taskReplyRepository
      .create(replyEntity);
  }

  public async getRepliesByTask(taskId: number) {
    return this.taskReplyRepository.findByTaskId(taskId);
  }

  public async getExecutor(taskId: number, userId: string) {
    return this.taskReplyRepository.findExecutor(taskId, userId);
  }
}
