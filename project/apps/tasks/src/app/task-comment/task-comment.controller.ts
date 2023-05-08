import { Controller, Delete, Param, ParseIntPipe, HttpStatus, Headers } from '@nestjs/common';
import { TaskCommentService } from './task-comment.service';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('comments')
@Controller('comments')
export class TaskCommentController {
  constructor(
    private readonly commentService: TaskCommentService
  ) {}

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The comment has been successfully deleted'
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'The user does not have enough rights to delete the comment'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'The user is not authorized'
  })
  @Delete(':id')
  public async delete(@Param('id', ParseIntPipe) id: number, @Headers('authorization') authorization?: string) {
    const token = authorization?.split(' ')[1];
    await this.commentService.deleteComment(id, token);
  }
}
