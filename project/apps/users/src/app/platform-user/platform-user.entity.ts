import { User, UserRole, City } from '@project/shared/shared-types';
import { compare, genSalt, hash } from 'bcrypt';
import { SALT_ROUNDS } from './platform-user.constant';

export class PlatformUserEntity implements User {
  public _id: string;
  public name: string;
  public email: string;
  public city: City;
  public passwordHash: string;
  public role: UserRole;
  public avatar?: string;
  public dateBirth: Date;
  public info?: string;
  public speciality?: string[];

  constructor(platformUser: User) {
    this.fillEntity(platformUser);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(platformUser: User) {
    this._id = platformUser._id;
    this.name = platformUser.name;
    this.email = platformUser.email;
    this.city = platformUser.city;
    this.passwordHash = platformUser.passwordHash;
    this.role = platformUser.role;
    this.avatar = platformUser.avatar;
    this.dateBirth = platformUser.dateBirth;
    this.info = platformUser.info;
    this.speciality = platformUser.speciality;
  }

  public async setPassword(password: string): Promise<PlatformUserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }
}
