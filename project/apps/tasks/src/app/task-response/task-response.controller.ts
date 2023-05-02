import { Controller, Body, Post, HttpStatus } from '@nestjs/common';
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
  @Post()
  public async create(@Body() dto: CreateResponseDto) {
    const newResponse = await this.responseService.createResponse(dto);
    return fillObject(ResponseRdo, newResponse);
  }
}
