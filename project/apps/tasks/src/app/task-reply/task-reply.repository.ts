import { Injectable } from '@nestjs/common';
import { CRUDRepository } from '@project/util/util-types';
import { TaskReplyEntity } from './task-reply.entity';
import { Reply } from '@project/shared/shared-types';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TaskReplyRepository implements CRUDRepository<TaskReplyEntity, number, Reply> {
  constructor(private readonly prisma: PrismaService) { }

  public async create(item: TaskReplyEntity): Promise<Reply> {
    const entityData = item.toObject();
    return await this.prisma.reply.create({
      data: {
        ...entityData
      }
    });
  }

  public async destroy(replyId: number): Promise<void> {
    await this.prisma.reply.delete({
      where: {
        replyId,
      }
    });
  }

  public async findById(replyId: number): Promise<Reply | null> {
    return this.prisma.reply.findFirst({
      where: {
        replyId
      },
    });
  }

  public async findByTaskId(taskId: number): Promise<Reply[]> {
    return await this.prisma.reply.findMany({
      where: {
        taskId
      },
    });
  }

  public async findExecutor(taskId: number, userId: string): Promise<Reply> {
    return await this.prisma.reply.findFirst({
      where: {
        taskId,
        userId
      },
    });
  }

  public async update(replyId: number, item: TaskReplyEntity): Promise<Reply> {
    const entityData = item.toObject();
    return await this.prisma.reply.update({
      where: {
        replyId,
      },
      data: {
        ...entityData,
      }
    });
  }
}
