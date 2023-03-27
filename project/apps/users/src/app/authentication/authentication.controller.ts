import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { CreateUserDto } from './dto/create-user.dto';
import { fillObject } from '@project/util/util-core';
import { UserRdo } from './rdo/user.rdo';
import { LoginUserDto } from './dto/login-user.dto';
import { LoggedUserRdo } from './rdo/logged-user.rdo';
import { CustomerRdo } from './rdo/customer.rdo';
import { ExecutorRdo } from './rdo/executor.rdo';
import { UserRole } from '@project/shared/shared-types';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('authentication')
@Controller('auth')
export class AuthenticationController {
  constructor (
    private readonly authService: AuthenticationService
  ) {}

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
    return fillObject(LoggedUserRdo, verifiedUser);
  }

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
  @Get(':id')
  public async show(@Param('id') id: string) {
    const existUser = await this.authService.getUser(id);
    return existUser.role === UserRole.Customer ? fillObject(CustomerRdo, existUser) : fillObject(ExecutorRdo, existUser);
  }
}
