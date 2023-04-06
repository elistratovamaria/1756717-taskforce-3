import { Body, Controller, Get, Patch, HttpStatus, Param } from '@nestjs/common';
import { PlatformUserService } from './platform-user.service';
import { fillObject } from '@project/util/util-core';
import { CustomerRdo } from './rdo/customer.rdo';
import { ExecutorRdo } from './rdo/executor.rdo';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRole } from '@project/shared/shared-types';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class PlatformUserController {
  constructor (
    private readonly platformUserService: PlatformUserService
  ) {}

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
  @Get(':id')
  public async show(@Param('id') id: string) {
    const existUser = await this.platformUserService.getUser(id);
    return existUser.role === UserRole.Customer ? fillObject(CustomerRdo, existUser) : fillObject(ExecutorRdo, existUser);
  }

  /** Изменение информации о пользователе */
  @ApiResponse({
    type: ExecutorRdo,
    status: HttpStatus.OK,
    description: 'User update'
  })
  @Patch(':id')
  public async update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    const user = await this.platformUserService.update(id, dto);
    return fillObject(ExecutorRdo, user);
  }

}
