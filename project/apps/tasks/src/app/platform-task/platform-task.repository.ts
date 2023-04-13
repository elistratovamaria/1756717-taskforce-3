import { Injectable } from '@nestjs/common';
import { CRUDRepository } from '@project/util/util-types';
import { PlatformTaskEntity } from './platform-task.entity';
import { Task } from '@project/shared/shared-types';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PlatformTaskRepository implements CRUDRepository<PlatformTaskEntity, number, Task> {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: PlatformTaskEntity): Promise<Task> {
    const {category, ...rest} = item;
    const record = await this.prisma.task.create({
      data: {
        ...rest,
        category: {
          create: {
            title: category,
          },
        },
        comments: {
          connect: []
        },
      },
    });
    return {
      ...record,
      category,
    };
  }

  public async destroy(taskId: number): Promise<void> {
    await this.prisma.task.delete({
      where: {
        taskId,
      }
    });
  }

  public async findById(taskId: number): Promise<Task | null> {
    const record = await this.prisma.task.findUnique({
      where: {
        taskId: taskId,
      },
      include: {
        category: {
          select: {
            title: true,
          },
        },
      },
    });
    return {
      ...record,
      category: record?.category?.title,
    };
  }

  public async find(): Promise<Task[]> {
    const records = await this.prisma.task.findMany({
      include: {
        category: {
          select: {
            title: true,
          },
        },
      },
    });
    return records.map((item) => ({
      ...item,
      category: item?.category?.title,
    }));
  }

  public async update(taskId: number, item: PlatformTaskEntity): Promise<Task> {
    const { category, ...rest } = item;
    const record = await this.prisma.task.update({
      where: {
        taskId: taskId,
      },
      data: {
        ...rest,
        comments: {
          connect: []
        },
      },
    });
    return {
      ...record,
      category,
    };
  }
}
