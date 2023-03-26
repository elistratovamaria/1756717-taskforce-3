import { CRUDRepository } from '@project/util/util-types';
import { TaskCommentEntity } from './task-comment.entity';
import { Comment } from '@project/shared/shared-types';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskCommentMemoryRepository implements CRUDRepository<TaskCommentEntity, string, Comment> {
  private repository: {[key: string]: Comment} = {};

  public async create(item: TaskCommentEntity): Promise<Comment> {
    const entry = { ...item.toObject(), _id: crypto.randomUUID()};
    this.repository[entry._id] = entry;

    return {...entry};
  }

  public async findById(id: string): Promise<Comment> {
    if (this.repository[id]) {
      return {...this.repository[id]};
    }

    return null;
  }

  public async destroy(id: string): Promise<void> {
    delete this.repository[id];
  }

  public async update(id: string, item: TaskCommentEntity): Promise<Comment> {
    this.repository[id] = {...item.toObject(), _id: id};
    return this.findById(id);
  }
}
