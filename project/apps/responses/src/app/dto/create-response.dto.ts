import { ApiProperty } from '@nestjs/swagger';

export class CreateResponseDto {
  @ApiProperty({
    description: 'Response message',
    example: 'Задание выполнено качественно и в срок'
  })
  public message: string;

  @ApiProperty({
    description: 'Task ID',
    example: '234'
  })
  public taskId: string;

  @ApiProperty({
    description: 'Evaluation by the customer of the completed task',
    example: 5
  })
  public estimation: number;
}
