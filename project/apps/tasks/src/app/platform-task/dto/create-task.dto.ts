import { City } from '@project/shared/shared-types';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({
    description: 'Task title',
    example: 'Клининг помещения'
  })
  public title: string;

  @ApiProperty({
    description: 'Task description',
    example: 'Выполнить клининг офисного помещения'
  })
  public description: string;

  @ApiProperty({
    description: 'Task category',
    example: 'Клининг'
  })
  public category: string;

  @ApiProperty({
    description: 'Task price',
    example: 1000
  })
  public price?: number;

  @ApiProperty({
    description: 'Task deadline',
    example: '2023-03-30'
  })
  public deadline?: Date;

  @ApiProperty({
    description: 'Task picture',
    example: '/img/img.png'
  })
  public image?: string;

  @ApiProperty({
    description: 'Address where task should be done',
    example: 'Санкт-Петербург, наб. реки Карповки, д.5 литера П'
  })
  public address?: string;

  @ApiProperty({
    description: 'Task tags',
    example: ['быстро', 'дешёво']
  })
  public tags?: string[];

  @ApiProperty({
    description: 'Task city',
    example: 'Москва',
    type: () => typeof City.Moscow
  })
  public city: City;
}
