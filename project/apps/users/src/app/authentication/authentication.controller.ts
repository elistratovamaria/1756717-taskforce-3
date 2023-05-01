import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { CreateUserDto } from './dto/create-user.dto';
import { fillObject } from '@project/util/util-core';
import { UserRdo } from './rdo/user.rdo';
import { LoggedUserRdo } from './rdo/logged-user.rdo';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { ExecutorRdo } from '../platform-user/rdo/executor.rdo';
import { CustomerRdo } from '../platform-user/rdo/customer.rdo';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { MongoidValidationPipe } from '@project/shared/shared-pipes';
import { UserRole } from '@project/shared/shared-types';
import { UpdateUserDto } from '../platform-user/dto/update-user.dto';
import { NotifyService } from '../notify/notify.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RequestWithUser } from '@project/shared/shared-types';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';

@ApiTags('authentication')
@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly authService: AuthenticationService,
    private readonly notifyService: NotifyService,
  ) { }

  /** Создание нового пользователя */
  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.CREATED,
    description: 'The new user has been successfully created.'
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'The user with this email is already exists'
  })
  @Post('register')
  public async create(@Body() dto: CreateUserDto) {
    const newUser = await this.authService.register(dto);
    const { email, name } = newUser;
    await this.notifyService.registerSubscriber({ email, name });
    return fillObject(UserRdo, newUser);
  }

  /** Авторизация пользователя */
  @UseGuards(LocalAuthGuard)
  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: 'User has been successfully logged.'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Password or Login is wrong'
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'The user with this email does not exist'
  })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  public async login(@Req() { user }: RequestWithUser) {
    return this.authService.createUserToken(user);
  }

  /** Получение информации о пользователе */
  @ApiResponse({
    type: ExecutorRdo,
    status: HttpStatus.OK,
    description: 'User found'
  })
  @ApiResponse({
    type: CustomerRdo,
    status: HttpStatus.OK,
    description: 'User found'
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'The user with this id does not exist'
  })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  public async show(@Param('id', MongoidValidationPipe) id: string) {
    const existUser = await this.authService.getUser(id);
    return existUser.role === UserRole.Customer ? fillObject(CustomerRdo, existUser) : fillObject(ExecutorRdo, existUser);
  }

  /** Изменение информации о пользователе */
  @ApiResponse({
    type: ExecutorRdo,
    status: HttpStatus.OK,
    description: 'User update'
  })
  @Patch(':id')
  public async update(@Param('id', MongoidValidationPipe) id: string, @Body() dto: UpdateUserDto) {
    const user = await this.authService.update(id, dto);
    return fillObject(ExecutorRdo, user);
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get a new access/refresh tokens'
  })
  public async refreshToken(@Req() { user }: RequestWithUser) {
    return this.authService.createUserToken(user);
  }
}
