import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCategoryDto {
  @ApiProperty({
    description: 'Category title',
    example: 'WebDev'
  })
  @IsString()
  public title: string;
}
