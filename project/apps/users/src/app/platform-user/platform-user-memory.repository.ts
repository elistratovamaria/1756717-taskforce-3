import { CRUDRepository } from '@project/util/util-types';
import { PlatformUserEntity } from './platform-user.entity';
import { User } from '@project/shared/shared-types';

export class PlatformUserMemoryRepository implements CRUDRepository<PlatformUserEntity, string, User> {
  private repository: {[key: string]: User} = {};

  public async create(item: PlatformUserEntity): Promise<User> {
    const entry = {...item.toObject(), _id: crypto.randomUUID()};
    this.repository[entry._id] = entry;

    return {...entry};
  }

  public async findById(id: string): Promise<User> {
    if (this.repository[id]) {
      return {...this.repository[id]};
    }

    return null;
  }

  public async findByEmail(email: string): Promise<User | null> {
    const existUser = Object.values(this.repository)
      .find((userItem => userItem.email === email));

    if (!existUser) {
      return null;
    }

    return {...existUser};
  }

  public async destroy(id: string): Promise<void> {
    delete this.repository[id];
  }

  public async update(id: string, item: PlatformUserEntity): Promise<User> {
    this.repository[id] = {...item.toObject(), _id: id};
    return this.findById(id);
  }
}
