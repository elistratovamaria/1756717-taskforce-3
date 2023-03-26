import { Controller, Body, Post, Delete, Param } from '@nestjs/common';
import { TaskCommentService } from './task-comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { fillObject } from '@project/util/util-core';
import { TaskCommentRdo } from './rdo/task-comment.rdo';

@Controller('comments')
export class TaskCommentController {
  constructor(
    private readonly commentService: TaskCommentService
  ) {}

  @Post()
  public async create(@Body() dto: CreateCommentDto) {
    const newComment = await this.commentService.createComment(dto);
    return fillObject(TaskCommentRdo, newComment);
  }

  @Delete(':id')
  public async delete(@Param('id') id: string) {
    this.commentService.deleteComment(id);
  }
}
