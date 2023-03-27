import { Controller, Body, Post, Delete, Param, HttpStatus } from '@nestjs/common';
import { TaskCommentService } from './task-comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { fillObject } from '@project/util/util-core';
import { TaskCommentRdo } from './rdo/task-comment.rdo';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('comments')
@Controller('comments')
export class TaskCommentController {
  constructor(
    private readonly commentService: TaskCommentService
  ) {}

  @ApiResponse({
    type: TaskCommentRdo,
    status: HttpStatus.CREATED,
    description: 'The comment has been successfully created'
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'User does not have enough rights to add a comment'
  })
  @Post()
  public async create(@Body() dto: CreateCommentDto) {
    const newComment = await this.commentService.createComment(dto);
    return fillObject(TaskCommentRdo, newComment);
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The comment has been successfully deleted'
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Comment with this ID does not exist'
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'The user does not have enough rights to delete the comment'
  })
  @Delete(':id')
  public async delete(@Param('id') id: string) {
    this.commentService.deleteComment(id);
  }
}
