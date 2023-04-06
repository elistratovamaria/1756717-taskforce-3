import { Injectable, ConflictException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PlatformUserRepository } from '../platform-user/platform-user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import dayjs from 'dayjs';
import { AuthUser } from './authentication.constant';
import { PlatformUserEntity } from '../platform-user/platform-user.entity';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly platformUserRepository: PlatformUserRepository
  ) {}

  /** Регистрация пользователя */
  public async register(dto: CreateUserDto) {
    const {name, email, city, password, role, dateBirth} = dto;

    const platformUser = {
      name, email, city, role,
      avatar: '', dateBirth: dayjs(dateBirth).toDate(),
      passwordHash: '', info: '', speciality: []
    };

    const existUser = await this.platformUserRepository
      .findByEmail(email);

    if (existUser) {
      throw new ConflictException(AuthUser.Exists);
    }

    const userEntity = await new PlatformUserEntity(platformUser)
      .setPassword(password)

    return this.platformUserRepository
      .create(userEntity);
  }

  /** Авторизация пользователя */
  public async verifyUser(dto: LoginUserDto) {
    const {email, password} = dto;
    const existUser = await this.platformUserRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(AuthUser.NotFound);
    }

    const platformUserEntity = new PlatformUserEntity(existUser);
    if (!await platformUserEntity.comparePassword(password)) {
      throw new UnauthorizedException(AuthUser.PasswordWrong);
    }

    return platformUserEntity.toObject();
  }
}
