import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({
    description: 'Comment message',
    example: 'Легкое задание'
  })
  public message: string;

  @ApiProperty({
    description: 'Task ID',
    example: '234'
  })
  public taskId: string;
}
