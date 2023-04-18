import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'Category title',
    example: 'WebDev'
  })
  @IsString()
  public title: string;
}
