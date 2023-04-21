import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { CreateUserDto } from './dto/create-user.dto';
import { fillObject } from '@project/util/util-core';
import { UserRdo } from './rdo/user.rdo';
import { LoginUserDto } from './dto/login-user.dto';
import { LoggedUserRdo } from './rdo/logged-user.rdo';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { ExecutorRdo } from '../platform-user/rdo/executor.rdo';
import { CustomerRdo } from '../platform-user/rdo/customer.rdo';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { MongoidValidationPipe } from '@project/shared/shared-pipes';
import { UserRole } from '@project/shared/shared-types';
import { UpdateUserDto } from '../platform-user/dto/update-user.dto';

@ApiTags('authentication')
@Controller('auth')
export class AuthenticationController {
  constructor (
    private readonly authService: AuthenticationService
  ) {}

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
    return fillObject(UserRdo, newUser);
  }

  /** Авторизация пользователя */
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
  public async login(@Body() dto: LoginUserDto) {
    const verifiedUser = await this.authService.verifyUser(dto);
    const loggedUser = await this.authService.createUserToken(verifiedUser);
    return fillObject(LoggedUserRdo, Object.assign(verifiedUser, loggedUser));
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
}
