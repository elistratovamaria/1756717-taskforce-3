import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsInt, Min, Max } from 'class-validator';
import { TaskResponseValidationMessage, TaskResponseSetting } from '../task-response.constant';

export class CreateResponseDto {
  @ApiProperty({
    description: 'Response message',
    example: 'Задание выполнено качественно и в срок'
  })
  @IsString()
  @Length(TaskResponseSetting.MessageMinLength, TaskResponseSetting.MessageMaxLength, {message: TaskResponseValidationMessage.MessageNotValid })
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
  @Min(TaskResponseSetting.EstimationMinValue, {message: TaskResponseValidationMessage.EstimationNotValid})
  @Max(TaskResponseSetting.EstimationMaxValue, {message: TaskResponseValidationMessage.EstimationNotValid})
  public estimation: number;
}
