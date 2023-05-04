import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsInt } from 'class-validator';
import { TaskCommentValidationMessage, TaskCommentSetting } from '../task-comment.constant';

export class CreateCommentDto {
  @ApiProperty({
    description: 'Comment message',
    example: 'Легкое задание'
  })
  @IsString()
  @Length(TaskCommentSetting.MessageMinLength, TaskCommentSetting.MessageMaxLength, {message: TaskCommentValidationMessage.MessageNotValid})
  public message: string;

  @ApiProperty({
    description: 'Task ID',
    example: '234'
  })
  @IsInt()
  public taskId: number;

  @ApiProperty({
    description: 'User ID',
    example: '6452ca1f33bbee8ea383010e'
  })
  @IsInt()
  public userId: string;
}
