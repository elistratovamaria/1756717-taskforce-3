import { Controller, Body, Post } from '@nestjs/common';
import { TaskResponseService } from './task-response.service';
import { CreateResponseDto } from '../dto/create-response.dto';
import { fillObject } from '@project/util/util-core';
import { ResponseRdo } from '../rdo/response.rdo';

@Controller('responses')
export class TaskResponseController {
  constructor(
    private readonly responseService: TaskResponseService
  ) {}

  @Post()
  public async create(@Body() dto: CreateResponseDto) {
    const newResponse = await this.responseService.createResponse(dto);
    return fillObject(ResponseRdo, newResponse);
  }
}
