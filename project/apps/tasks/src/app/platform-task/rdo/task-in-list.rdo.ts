import { Expose, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Category } from '@project/shared/shared-types';

export class TaskInListRdo {
  @ApiProperty({
    description: 'The unique task ID',
    example: 234
  })
  @Expose({name: 'taskId'})
  public id: number;

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
  @Transform(({obj}) => obj.title)
  public category: Category;

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
    description: 'User Id',
    example: '6457ccd22d75f5c87f8b7657'
  })
  @Expose()
  public userId: string;

  @ApiProperty({
    description: 'Date when the task was created',
    example: '2023-05-07'
  })
  @Expose()
  public createdAt: Date;

  @ApiProperty({
    description: 'Comments amount',
    example: 20
  })
  @Expose()
  public commentsAmount: number;

  @ApiProperty({
    description: 'Replies amount',
    example: 20
  })
  @Expose()
  public repliesAmount: number;
}
