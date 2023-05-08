import { Controller, Body, Post, HttpStatus, Param, Headers } from '@nestjs/common';
import { TaskResponseService } from './task-response.service';
import { CreateResponseDto } from './dto/create-response.dto';
import { fillObject } from '@project/util/util-core';
import { ResponseRdo } from './rdo/response.rdo';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('responses')
@Controller('responses')
export class TaskResponseController {
  constructor(
    private readonly responseService: TaskResponseService
  ) {}

  @ApiResponse({
    type: ResponseRdo,
    status: HttpStatus.CREATED,
    description: 'The new response has been successfully created'
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'User does not have enough rights to add a response'
  })
  @Post(':taskId/:userId')
  public async create(@Body() dto: CreateResponseDto, @Param('taskId') taskId: number, @Param('userId') userId: string, @Headers('authorization') authorization?: string) {
    const token = authorization?.split(' ')[1];
    const newResponse = await this.responseService.createResponse(dto, userId, taskId, token);
    return fillObject(ResponseRdo, newResponse);
  }
}
