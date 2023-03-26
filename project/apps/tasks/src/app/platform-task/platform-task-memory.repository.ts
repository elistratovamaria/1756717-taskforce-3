import { CRUDRepository } from '@project/util/util-types';
import { PlatformTaskEntity } from './platform-task.entity';
import { Task } from '@project/shared/shared-types';
import crypto from 'node:crypto';

export class PlatformTaskMemoryRepository implements CRUDRepository<PlatformTaskEntity, string, Task> {
  private repository: {[key: string]: Task} = {};

  public async create(item: PlatformTaskEntity): Promise<Task> {
    const entry = { ...item.toObject(), _id: crypto.randomUUID()};
    this.repository[entry._id] = entry;

    return {...entry};
  }

  public async findById(id: string): Promise<Task> {
    if (this.repository[id]) {
      return {...this.repository[id]};
    }

    return null;
  }

  public async destroy(id: string): Promise<void> {
    delete this.repository[id];
  }

  public async update(id: string, item: PlatformTaskEntity): Promise<Task> {
    this.repository[id] = {...item.toObject(), _id: id};
    return this.findById(id);
  }
}
