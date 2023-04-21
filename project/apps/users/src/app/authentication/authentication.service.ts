import { Injectable, ConflictException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PlatformUserRepository } from '../platform-user/platform-user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import dayjs from 'dayjs';
import { AuthUser } from './authentication.constant';
import { PlatformUserEntity } from '../platform-user/platform-user.entity';
import { TokenPayload, User } from '@project/shared/shared-types';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from '../platform-user/dto/update-user.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly platformUserRepository: PlatformUserRepository,
    private readonly jwtService: JwtService,
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

  public async createUserToken(user: User) {
    const payload: TokenPayload = {
      sub: user._id,
      email: user.email,
      role: user.role,
      name: user.name,
    };

    return {
      accessToken: await this.jwtService.signAsync(payload),
    }
  }
}
