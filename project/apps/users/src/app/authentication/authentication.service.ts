import { Injectable, ConflictException } from '@nestjs/common';
import { PlatformUserMemoryRepository } from '../platform-user/platform-user-memory.repository';
import { CreateUserDto } from './dto/create-user.dto';
import dayjs from 'dayjs';
import { AUTH_USER_EXISTS } from './authentication.constant';
import { PlatformUserEntity } from '../platform-user/platform-user.entity';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly platformUserRepository: PlatformUserMemoryRepository
  ) {}

  public async register(dto: CreateUserDto) {
    const {name, email, city, password, role, dateBirth} = dto;

    const platformUser = {
      name, email, city, role,
      avatar: '', dateBirth: dayjs(dateBirth).toDate(),
      passwordHash: ''
    };

    const existUser = await this.platformUserRepository
      .findByEmail(email);

    if (existUser) {
      throw new ConflictException(AUTH_USER_EXISTS);
    }

    const userEntity = await new PlatformUserEntity(platformUser)
      .setPassword(password)

    return this.platformUserRepository
      .create(userEntity);
  }
}
