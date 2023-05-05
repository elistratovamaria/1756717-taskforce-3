import { Injectable } from '@nestjs/common';
import { CRUDRepository } from '@project/util/util-types';
import { TaskResponseEntity } from './task-response.entity';
import { Response } from '@project/shared/shared-types';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TaskResponseRepository implements CRUDRepository<TaskResponseEntity, number, Response> {
  constructor(private readonly prisma: PrismaService) { }

  public async create(item: TaskResponseEntity): Promise<Response> {
    const entityData = item.toObject();
    return await this.prisma.response.create({
      data: {
        ...entityData
      }
    });
  }

  public async destroy(responseId: number): Promise<void> {
    await this.prisma.response.delete({
      where: {
        responseId,
      }
    });
  }

  public async findById(responseId: number): Promise<Response | null> {
    return this.prisma.response.findFirst({
      where: {
        responseId
      },
    });
  }

  public async update(responseId: number, item: TaskResponseEntity): Promise<Response> {
    const entityData = item.toObject();
    return await this.prisma.response.update({
      where: {
        responseId,
      },
      data: {
        ...entityData,
      }
    });
  }
}
