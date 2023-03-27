import { CRUDRepository } from '@project/util/util-types';
import { TaskResponseEntity } from './task-response.entity';
import { Response } from '@project/shared/shared-types';
import { Injectable } from '@nestjs/common';
import crypto from 'node:crypto';

@Injectable()
export class TaskResponseMemoryRepository implements CRUDRepository<TaskResponseEntity, string, Response> {
  private repository: {[key: string]: Response} = {};

  public async create(item: TaskResponseEntity): Promise<Response> {
    const entry = { ...item.toObject(), _id: crypto.randomUUID()};
    this.repository[entry._id] = entry;

    return {...entry};
  }

  public async findById(id: string): Promise<Response> {
    if (this.repository[id]) {
      return {...this.repository[id]};
    }

    return null;
  }

  public async destroy(id: string): Promise<void> {
    delete this.repository[id];
  }

  public async update(id: string, item: TaskResponseEntity): Promise<Response> {
    this.repository[id] = {...item.toObject(), _id: id};
    return this.findById(id);
  }
}
