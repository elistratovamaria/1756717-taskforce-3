import { Injectable, NotFoundException } from '@nestjs/common';
import { PlatformUserRepository } from '../platform-user/platform-user.repository';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthUser } from '../authentication/authentication.constant';
import { PlatformUserEntity } from './platform-user.entity';

@Injectable()
export class PlatformUserService {
  constructor(
    private readonly platformUserRepository: PlatformUserRepository
  ) {}

  /** Получение данных о пользователе */
  public async getUser(id: string) {
    return this.platformUserRepository.findById(id);
  }

  /** Изменение информации о пользователе */
  public async update(id: string, dto: UpdateUserDto) {
    const user = await this.platformUserRepository.findById(id);
    if (!user) {
      throw new NotFoundException(AuthUser.NotFound);
    }

    const userEntity = new PlatformUserEntity({ ...user, ...dto });
    return this.platformUserRepository.update(id, userEntity);
  }
}
