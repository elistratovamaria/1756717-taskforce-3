import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { PlatformTaskService } from './platform-task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { fillObject } from '@project/util/util-core';
import { TaskRdo } from './rdo/task.rdo';

@Controller('tasks')
export class PlatformTaskController {
  constructor(
    private readonly taskService: PlatformTaskService
  ) {}

  @Post()
  public async create(@Body() dto: CreateTaskDto) {
    const newTask = await this.taskService.createTask(dto);
    return fillObject(TaskRdo, newTask);
  }

  @Get(':id')
  public async show(@Param('id') id: string) {
    const existTask = await this.taskService.getTask(id);
    return fillObject(TaskRdo, existTask);
  }
}
