import { Injectable } from '@nestjs/common';
import { CRUDRepository } from '@project/util/util-types';
import { PlatformTaskEntity } from './platform-task.entity';
import { City, SortType, StatusTask, Task, UserRole } from '@project/shared/shared-types';
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
        replies: {
          create: []
        }
      },
      include: {
        category: true,
        replies: true,
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

  public async find({ limit, category, tag, city, sortDirection, sortType, page }: TaskQuery): Promise<Task[]> {
    let tasks: Task[];
    if (sortType === SortType.Discussed) {
      tasks = await this.prisma.task.findMany({
        where: {
          category: category,
          tags: (() => {
            if (!tag) {
              return undefined;
            }

            return {
              hasSome: tag,
            };
          })(),
          city: city,
          status: 'new',
        },
        take: limit,
        include: {
          comments: true,
          category: true,
          replies: true
        },
        orderBy: {
          comments: {
            _count: sortDirection
          }
        },
        skip: page > 0 ? limit * (page - 1) : undefined,
      });
    } else if (sortType === SortType.Responsed) {
      tasks = await this.prisma.task.findMany({
        where: {
          category: category,
          tags: (() => {
            if (!tag) {
              return undefined;
            }

            return {
              hasSome: tag,
            };
          })(),
          city: city,
          status: 'new'
        },
        take: limit,
        include: {
          comments: true,
          category: true,
          replies: true
        },
        orderBy: {
          replies: {
            _count: sortDirection
          }
        },
        skip: page > 0 ? limit * (page - 1) : undefined,
      });
    } else {
      tasks = await this.prisma.task.findMany({
        where: {
          category: category,
          tags: (() => {
            if (!tag) {
              return undefined;
            }

            return {
              hasSome: tag,
            };
          })(),
          city: city,
          status: 'new'
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
    return tasks.map((task) => ({
      ...task,
      commentsAmount: task.comments?.length || 0,
      repliesAmount: task.replies?.length || 0
    }));
  }

  public async findMyTasks(role: UserRole, id: string, status?: StatusTask): Promise<Task[]> {
    let tasks: Task[];
    if (role === UserRole.Customer) {
      tasks = await this.prisma.task.findMany({
        where: {
          userId: id,
          status,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
    } else {
      tasks = await this.prisma.task.findMany({
        where: {
          executorId: id,
          status,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
    }
    return tasks.map((task) => ({
      ...task,
      commentsAmount: task.comments?.length || 0,
      repliesAmount: task.replies?.length || 0
    }));
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

  public async checkExecutorInWork(userId: string): Promise<boolean> {
    const tasksInProgress = await this.prisma.task.findMany({
      where: {
        status: 'inprogress'
      }
    });
    const executorsInWork = tasksInProgress.map((task) => task.executorId);
    return executorsInWork.includes(userId);
  }

  public async countExecutorFailedTasks(userId: string): Promise<number> {
    const failedTasks = await this.prisma.task.findMany({
      where: {
        status: 'failed',
        executorId: userId
      }
    });
    return failedTasks.length;
  }
}
