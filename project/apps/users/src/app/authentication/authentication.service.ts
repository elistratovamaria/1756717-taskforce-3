import { Injectable, ConflictException, Inject, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PlatformUserRepository } from '../platform-user/platform-user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ConfigService, ConfigType } from '@nestjs/config';
import dayjs from 'dayjs';
import { AuthUser } from './authentication.constant';
import { PlatformUserEntity } from '../platform-user/platform-user.entity';
import { User } from '@project/shared/shared-types';
import { JwtService } from '@nestjs/jwt';
import { jwtConfig } from '@project/config/config-users';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';
import { createJWTPayload } from '@project/util/util-core';
import * as crypto from 'node:crypto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly platformUserRepository: PlatformUserRepository,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    @Inject (jwtConfig.KEY) private readonly jwtOptions: ConfigType<typeof jwtConfig>,
    private readonly refreshTokenService: RefreshTokenService,
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

    if (dto.speciality) {
      dto.speciality = [...new Set(dto.speciality)];
    }

    const userEntity = new PlatformUserEntity({ ...user, ...dto });
    return this.platformUserRepository.update(id, userEntity);
  }

  /** Изменение пароля пользователя */

  async changePassword(dto: ChangePasswordDto, id: string) {
    const { oldPassword, newPassword } = dto;
    const user = await this.platformUserRepository.findById(id);
    await this.verifyUser({
      email: user.email,
      password: oldPassword,
    });
    const userEntity = await new PlatformUserEntity({ ...user }).setPassword(
      newPassword
    );
    return this.platformUserRepository.update(id, userEntity);
  }

  public async createUserToken(user: User) {
    const accessTokenPayload = createJWTPayload(user);
    const refreshTokenPayload = { ...accessTokenPayload, tokenId: crypto.randomUUID() };
    await this.refreshTokenService.createRefreshSession(refreshTokenPayload)

    return {
      accessToken: await this.jwtService.signAsync(accessTokenPayload),
      refreshToken: await this.jwtService.signAsync(refreshTokenPayload, {
        secret: this.jwtOptions.refreshTokenSecret,
        expiresIn: this.jwtOptions.refreshTokenExpiresIn
      })
    }
  }
}
