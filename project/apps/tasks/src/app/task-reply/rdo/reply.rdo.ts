import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class TaskReplyRdo {
  @ApiProperty({
    description: 'The unique comment id',
    example: 12
  })
  @Expose({ name: 'id' })
  public id: number;

  @ApiProperty({
    description: 'Task ID',
    example: 234
  })
  @Expose()
  public taskId: number;

  @ApiProperty({
    description: 'User ID',
    example: '6452ca1f33bbee8ea383010e'
  })
  @Expose()
  public userId: string;
}
