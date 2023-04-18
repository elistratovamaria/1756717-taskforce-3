import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsInt, Min, Max } from 'class-validator';
import { TaskResponseValidationMessage } from '../task-response.constant';

export class CreateResponseDto {
  @ApiProperty({
    description: 'Response message',
    example: 'Задание выполнено качественно и в срок'
  })
  @IsString()
  @Length(50, 500, {message: TaskResponseValidationMessage.MessageNotValid })
  public message: string;

  @ApiProperty({
    description: 'Task ID',
    example: '234'
  })
  @IsInt()
  public taskId: number;

  @ApiProperty({
    description: 'Evaluation by the customer of the completed task',
    example: 5
  })
  @IsInt()
  @Min(1, {message: TaskResponseValidationMessage.EstimationNotValid})
  @Max(5, {message: TaskResponseValidationMessage.EstimationNotValid})
  public estimation: number;
}
