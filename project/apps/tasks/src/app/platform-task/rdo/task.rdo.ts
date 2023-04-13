import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class TaskRdo {
  @ApiProperty({
    description: 'The unique task ID',
    example: '234'
  })
  @Expose({name: '_id'})
  public id: string;

  @ApiProperty({
    description: 'Task title',
    example: 'Клининг помещения'
  })
  @Expose()
  public title: string;

  @ApiProperty({
    description: 'Task description',
    example: 'Выполнить клининг офисного помещения'
  })
  @Expose()
  public description: string;

  @ApiProperty({
    description: 'Task category',
    example: 'Клининг'
  })
  @Expose()
  public category: string;

  @ApiProperty({
    description: 'Task price',
    example: 1000
  })
  @Expose()
  public price: number;

  @ApiProperty({
    description: 'Task deadline',
    example: '2023-03-30'
  })
  @Expose()
  public deadline: string;

  @ApiProperty({
    description: 'Task picture',
    example: '/img/img.png'
  })
  @Expose()
  public image: string;

  @ApiProperty({
    description: 'Address where task should be done',
    example: 'Санкт-Петербург, наб. реки Карповки, д.5 литера П'
  })
  @Expose()
  public address: string;

  @ApiProperty({
    description: 'Task tags',
    example: ['быстро', 'дешёво']
  })
  @Expose()
  public tags: string[];

  @ApiProperty({
    description: 'Task city',
    example: 'Москва'
  })
  @Expose()
  public city: string;

  @ApiProperty({
    description: 'Task status',
    example: 'Новое'
  })
  @Expose()
  public status: string;

  @ApiProperty({
    description: 'User ID',
    example: '13'
  })
  @Expose()
  public userId: string;
}
