import { Injectable, ConflictException, Inject, NotFoundException, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { PlatformUserRepository } from '../platform-user/platform-user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ConfigService, ConfigType } from '@nestjs/config';
import dayjs from 'dayjs';
import { AuthException } from './authentication.constant';
import { PlatformUserEntity } from '../platform-user/platform-user.entity';
import { RabbitRouting, User, UserRole } from '@project/shared/shared-types';
import { JwtService } from '@nestjs/jwt';
import { jwtConfig } from '@project/config/config-users';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';
import { createJWTPayload } from '@project/util/util-core';
import * as crypto from 'node:crypto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { AdditionalInfoDto } from './dto/additional-info.dto';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly platformUserRepository: PlatformUserRepository,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    @Inject (jwtConfig.KEY) private readonly jwtOptions: ConfigType<typeof jwtConfig>,
    private readonly refreshTokenService: RefreshTokenService,
  ) {}

  public async register(dto: CreateUserDto, token?: string) {
    const user = this.jwtService.decode(token);

    if (user) {
      throw new ForbiddenException(AuthException.IsAuthorized);
    }

    const {name, email, city, password, role, dateBirth} = dto;

    const platformUser = {
      name, email, city, role,
      avatar: '', dateBirth: dayjs(dateBirth).toDate(),
      passwordHash: '', info: '', specialties: []
    };

    const existUser = await this.platformUserRepository
      .findByEmail(email);

    if (existUser) {
      throw new ConflictException(AuthException.Exists);
    }

    const userEntity = await new PlatformUserEntity(platformUser)
      .setPassword(password)

    return this.platformUserRepository
      .create(userEntity);
  }

  public async verifyUser(dto: LoginUserDto) {
    const {email, password} = dto;
    const existUser = await this.platformUserRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(AuthException.NotFound);
    }

    const platformUserEntity = new PlatformUserEntity(existUser);
    if (!await platformUserEntity.comparePassword(password)) {
      throw new UnauthorizedException(AuthException.PasswordWrong);
    }

    return platformUserEntity.toObject();
  }

  public async subscribe(id: string) {
    const user = this.platformUserRepository.findById(id);

    if (!user) {
      throw new NotFoundException(AuthException.NotFound);
    }

    if (user['role'] !== UserRole.Executor) {
      throw new ForbiddenException(AuthException.NotExecutor);
    }

    return this.platformUserRepository.findById(user['sub']);
  }

  public async getUser(id: string) {
    return this.platformUserRepository.findById(id);
  }

  public async update(id: string, dto: UpdateUserDto) {
    const user = await this.platformUserRepository.findById(id);
    if (!user) {
      throw new NotFoundException(AuthException.NotFound);
    }

    if (dto.specialties) {
      const specialties = dto.specialties.map((spec) => spec.toLowerCase());
      dto.specialties = [...new Set(specialties)];
    }

    const userEntity = new PlatformUserEntity({ ...user, ...dto });
    return await this.platformUserRepository.update(id, userEntity);
  }

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

  public async updateAdditionalInfo(dto: AdditionalInfoDto) {
    const {userId, rating} = dto;
    const user = await this.platformUserRepository.findById(userId);
    if (!user) {
      throw new NotFoundException(AuthException.NotFound);
    }

    const userEntity = new PlatformUserEntity({ ...user, rating });
    return await this.platformUserRepository.update(userId, userEntity);
  }
}
