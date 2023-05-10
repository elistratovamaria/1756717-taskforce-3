import { Body, Controller, Post, Get, Param, HttpStatus, Delete, Query, Patch, Headers} from '@nestjs/common';
import { PlatformTaskService } from './platform-task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { fillObject } from '@project/util/util-core';
import { TaskRdo } from './rdo/task.rdo';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { TaskQuery } from './query/task.query';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskReplyRdo } from '../task-reply/rdo/reply.rdo';
import { TaskInListRdo } from './rdo/task-in-list.rdo';
import { TaskCommentRdo } from '../task-comment/rdo/task-comment.rdo';
import { CreateCommentDto } from '../task-comment/dto/create-comment.dto';
import { TaskCommentQuery } from '../task-comment/query/task-comment.query';
import { ResponseRdo } from './rdo/response.rdo';
import { CreateResponseDto } from './dto/create-response.dto';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { RabbitRouting } from '@project/shared/shared-types';
import { AdditionalInfoDto } from './dto/additional-info.dto';

@ApiTags('tasks')
@Controller('tasks')
export class PlatformTaskController {
  constructor(
    private readonly taskService: PlatformTaskService,
  ) {}

  @ApiResponse({
    type: TaskRdo,
    status: HttpStatus.CREATED,
    description: 'The new task has been successfully created'
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'User does not have enough rights to add a task'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'The user is not authorized'
  })
  @Post()
  public async create(@Body() dto: CreateTaskDto, @Headers('authorization') authorization?: string) {
    const token = authorization?.split(' ')[1];
    const newTask = await this.taskService.createTask(dto, token);
    return fillObject(TaskRdo, newTask);
  }

  @ApiResponse({
    type: TaskInListRdo,
    status: HttpStatus.OK,
    description: 'Tasks found'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'The user is not authorized'
  })
  @Get('/mytasks')
  async showMyTasks(@Query() query: TaskQuery, @Headers('authorization') authorization?: string) {
    const token = authorization?.split(' ')[1];
    const tasks = await this.taskService.getMyTasks(query, token);
    return fillObject(TaskInListRdo, tasks);
  }

  @ApiResponse({
    type: TaskRdo,
    status: HttpStatus.OK,
    description: 'Task found'
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Task with this ID does not exist'
  })
  @Get('/:id')
  public async show(@Param('id') id: number) {
    const existTask = await this.taskService.getTask(id);
    return fillObject(TaskRdo, existTask);
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The task has been successfully deleted'
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Task with this ID does not exist'
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'The user does not have enough rights to delete the task'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'The user is not authorized'
  })
  @Delete('/:id')
  public async delete(@Param('id') id: number, @Headers('authorization') authorization?: string) {
    const token = authorization?.split(' ')[1];
    await this.taskService.deleteTask(id, token);
  }


  @ApiResponse({
    type: TaskInListRdo,
    status: HttpStatus.OK,
    description: 'Tasks found'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'The user is not authorized'
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'The user does not have enough rights to see new tasks'
  })
  @Get('/')
  async index(@Query() query: TaskQuery, @Headers('authorization') authorization?: string) {
    const token = authorization?.split(' ')[1];
    const tasks = await this.taskService.getNewTasks(query, token);
    return fillObject(TaskInListRdo, tasks);
  }

  @ApiResponse({
    type: TaskRdo,
    status: HttpStatus.OK,
    description: 'The task has been successfully updated'
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Task with this ID does not exist'
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'User does not have enough rights to update a task'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'The user is not authorized'
  })
  @Patch('/:id')
  public async update(@Body() dto: UpdateTaskDto, @Param('id') id: number, @Headers('authorization') authorization?: string) {
    const token = authorization?.split(' ')[1];
    const updatedTask = await this.taskService.updateTask(id, dto, token);
    return fillObject(TaskRdo, updatedTask);
  }

  @ApiResponse({
    type: TaskRdo,
    status: HttpStatus.OK,
    description: 'The status has been successfully updated'
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Task with this ID does not exist'
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'User does not have enough rights to add a task'
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Incorrect status changing'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'The user is not authorized'
  })
  @Patch('/:id/status')
  public async changeStatus(@Param('id') id: number, @Body() dto: UpdateTaskDto, @Headers('authorization') authorization?: string) {
    const token = authorization?.split(' ')[1];
    const updatedTask = await this.taskService.changeStatus(id, dto, token);
    return fillObject(TaskRdo, updatedTask);
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The reply has been successfully created'
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Task with this ID does not exist'
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'User does not have enough rights to add a reply'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'The user is not authorized'
  })
  @Post('/:id/reply')
  public async putReply(@Param('id', ) id: number, @Headers('authorization') authorization?: string) {
    const token = authorization?.split(' ')[1];
    const reply = await this.taskService.putReply(id, token);
    return fillObject(TaskReplyRdo, reply);
  }

  @ApiResponse({
    type: TaskCommentRdo,
    status: HttpStatus.CREATED,
    description: 'The comment has been successfully created'
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'User does not have enough rights to add a comment'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'The user is not authorized'
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Task with this ID does not exist'
  })
  @Post('/:taskId/comments')
  public async createComment(@Body() dto: CreateCommentDto, @Param('taskId') taskId: number, @Headers('authorization') authorization?: string) {
    const token = authorization?.split(' ')[1];
    const newComment = await this.taskService.createComment(dto, taskId, token);
    return fillObject(TaskCommentRdo, newComment);
  }

  @ApiResponse({
    type: TaskCommentRdo,
    status: HttpStatus.OK,
    description: 'Comments found'
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Task with this ID does not exist'
  })
  @Get('/:taskId/comments')
  async showComments(@Query() query: TaskCommentQuery, @Param('taskId') taskId: number) {
    const comments = await this.taskService.getComments(query, taskId);
    return fillObject(TaskCommentRdo, comments);
  }

  @ApiResponse({
    type: ResponseRdo,
    status: HttpStatus.CREATED,
    description: 'The new response has been successfully created'
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'User does not have enough rights to add a response'
  })
  @Post(':taskId/:userId/response')
  public async createResponse(@Body() dto: CreateResponseDto, @Param('taskId') taskId: number, @Param('userId') userId: string, @Headers('authorization') authorization?: string) {
    const token = authorization?.split(' ')[1];
    const newResponse = await this.taskService.createResponse(dto, userId, taskId, token);
    return fillObject(ResponseRdo, newResponse);
  }

  @RabbitSubscribe({
    exchange: 'taskforce.notify',
    routingKey: RabbitRouting.SendUserId,
    queue: 'taskforce.notify',
  })
  @Post()
  public async updateAdditionalInfo(userId: string) {
    await this.taskService.countRating(userId);
  }
}
