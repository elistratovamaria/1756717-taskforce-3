import { Injectable } from '@nestjs/common';
import { CRUDRepository } from '@project/util/util-types';
import { PlatformTaskEntity } from './platform-task.entity';
import { Task } from '@project/shared/shared-types';
import { PrismaService } from '../prisma/prisma.service';
import { TaskQuery } from './query/task.query';

@Injectable()
export class PlatformTaskRepository implements CRUDRepository<PlatformTaskEntity, number, Task> {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: PlatformTaskEntity): Promise<Task> {
    const entityData = item.toObject();
    return await this.prisma.task.create({
      data: {
        ...entityData,
        comments: {
          create: []
        },
        category: {
          create: entityData.category,
        },
      },
      include: {
        comments: true,
        category: true,
      }
    });
  }

  public async destroy(taskId: number): Promise<void> {
    await this.prisma.task.delete({
      where: {
        taskId,
      }
    });
  }

  public async findById(taskId: number): Promise<Task | null> {
    return this.prisma.task.findFirst({
      where: {
        taskId
      },
      include: {
        comments: true,
        category: true,
      }
    });
  }

  public async find({limit, category, tag, city, sortDirection, page}: TaskQuery): Promise<Task[]> {
    return await this.prisma.task.findMany({
      where: {
        category: {
          is: {
            categoryId: category.categoryId,
        },
      },
        tags: {
          has: tag,
        },
        city: {
          equals: city,
        }
      },
      take: limit,
      include: {
        comments: true,
        category: true,
      },
      orderBy: [
        { createdAt: sortDirection }
      ],
      skip: page > 0 ? limit * (page - 1) : undefined,
    });
  }

  public async update(taskId: number, item: PlatformTaskEntity): Promise<Task> {
    const entityData = item.toObject();
    return await this.prisma.task.update({
      where: {
        taskId: taskId,
      },
      data: {
        ...entityData,
        comments: {
          connect: []
        },
        category: {
          create: entityData.category,
        },
      },
      include: {
        comments: true,
        category: true,
      }
    });
  }
}
