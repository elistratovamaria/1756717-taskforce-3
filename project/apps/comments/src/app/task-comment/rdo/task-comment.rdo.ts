import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class TaskCommentRdo {
  @ApiProperty({
    description: 'The unique comment id',
    example: '12'
  })
  @Expose({ name: '_id' })
  public id: string;

  @ApiProperty({
    description: 'Comment message',
    example: 'Легкое задание'
  })
  @Expose()
  public message: string;

  @ApiProperty({
    description: 'Task ID',
    example: '234'
  })
  @Expose()
  public taskId: string;
}
