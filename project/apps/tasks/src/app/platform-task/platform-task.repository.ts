import { Injectable } from '@nestjs/common';
import { CRUDRepository } from '@project/util/util-types';
import { PlatformTaskEntity } from './platform-task.entity';
import { City, StatusTask, Task } from '@project/shared/shared-types';
import { PrismaService } from '../prisma/prisma.service';
import { TaskQuery } from './query/task.query';

@Injectable()
export class PlatformTaskRepository implements CRUDRepository<PlatformTaskEntity, number, Task> {
  constructor(private readonly prisma: PrismaService) { }

  public async create(item: PlatformTaskEntity): Promise<Task> {
    const entityData = item.toObject();
    return await this.prisma.task.create({
      data: {
        title: entityData.title,
        description: entityData.description,
        categoryId: entityData.categoryId,
        price: entityData.price,
        deadline: entityData.deadline,
        image: entityData.image,
        address: entityData.address,
        tags: entityData.tags,
        city: entityData.city as City,
        status: entityData.status as StatusTask,
        userId: entityData.userId,
        executorId: entityData.executorId,
        comments: {
          create: [],
        },
        hasResponse: entityData.hasResponse,
        replies:  {
          create: []
        }
      },
      include: {
        category: true,
        replies: true
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
    return await this.prisma.task.findFirst({
      where: {
        taskId
      },
      include: {
        category: true,
        replies: true,
      }
    });
  }

  public async find({ limit, category, tag, city, sortDirection, page }: TaskQuery): Promise<Task[]> {
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
        replies: true
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
        taskId,
      },
      data: {
        title: entityData.title,
        description: entityData.description,
        categoryId: entityData.categoryId,
        price: entityData.price,
        deadline: entityData.deadline,
        image: entityData.image,
        address: entityData.address,
        tags: entityData.tags,
        city: entityData.city as City,
        status: entityData.status as StatusTask,
        userId: entityData.userId,
        executorId: entityData.executorId,
        hasResponse: entityData.hasResponse,
      },
      include: {
        category: true,
      }
    });
  }
}
