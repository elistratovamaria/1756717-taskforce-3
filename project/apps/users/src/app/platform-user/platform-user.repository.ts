import { CRUDRepository } from '@project/util/util-types';
import { Injectable } from '@nestjs/common';
import { PlatformUserEntity } from './platform-user.entity';
import { User } from '@project/shared/shared-types';
import { PlatformUserModel } from './platform-user.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PlatformUserRepository implements CRUDRepository<PlatformUserEntity, string, User> {
  constructor(
    @InjectModel(PlatformUserModel.name) private readonly platformUserModel: Model<PlatformUserModel>) {
  }

  public async create(item: PlatformUserEntity): Promise<User> {
    const newPlatformUser = new this.platformUserModel(item);
    return newPlatformUser.save();
  }

  public async destroy(id: string): Promise<void> {
    this.platformUserModel.deleteOne({id});
  }

  public async findById(id: string): Promise<User | null> {
    return this.platformUserModel
      .findOne({id})
      .exec();
  }

  public async findByEmail(email: string): Promise<User | null> {
    return this.platformUserModel
      .findOne({email})
      .exec();
  }

  public async update(id: string, item: PlatformUserEntity): Promise<User> {
    return this.platformUserModel
      .findByIdAndUpdate(id, item.toObject(), {new: true})
      .exec();
  }
}
