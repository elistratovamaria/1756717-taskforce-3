import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsInt } from 'class-validator';
import { TaskCommentValidationMessage } from '../task-comment.constant';

export class CreateCommentDto {
  @ApiProperty({
    description: 'Comment message',
    example: 'Легкое задание'
  })
  @IsString()
  @Length(10, 300, {message: TaskCommentValidationMessage.MessageNotValid})
  public message: string;

  @ApiProperty({
    description: 'Task ID',
    example: '234'
  })
  @IsInt()
  public taskId: number;
}
