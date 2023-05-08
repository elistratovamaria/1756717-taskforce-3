import { Expose, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ExecutorRdo {
  @ApiProperty({
    description: 'The unique user ID',
    example: '22'
  })
  @Expose({name: '_id'})
  @Transform(({obj}) => obj._id.toString())
  public id: string;

  @ApiProperty({
    description: 'User name',
    example: 'Ivan Smirnov'
  })
  @Expose()
  public name: string;

  @ApiProperty({
    description: 'User registration date',
    example: '2023-02-15'
  })
  @Expose()
  public dateCreate: string;

  @ApiProperty({
    description: 'User city',
    example: 'Москва'
  })
  @Expose()
  public city: string;

  @ApiProperty({
    description: 'User age',
    example: 30
  })
  @Expose()
  public age: number;

  @ApiProperty({
    description: 'User role',
    example: 'Исполнитель'
  })
  @Expose()
  public role: string;

  @ApiProperty({
    description: 'User rating',
    example: 4.5
  })
  @Expose()
  public rating: number;

  @ApiProperty({
    description: 'User done tasks amount',
    example: 30
  })
  @Expose()
  public tasksDoneAmount: number;

  @ApiProperty({
    description: 'User failed tasks amount',
    example: 1
  })
  @Expose()
  public tasksFailedAmount: number;

  @ApiProperty({
    description: 'User unique email',
    example: 'user@user.com'
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: 'Information about the user',
    example: 'Lorem ipsum'
  })
  @Expose()
  public info: string;

  @ApiProperty({
    description: 'User specialities',
    example: ['webdev', 'technical writer']
  })
  @Expose()
  public specialties: string[];

  @ApiProperty({
    description: 'User place in the rating',
    example: 9
  })
  @Expose()
  public placeInRating: number;

  @ApiProperty({
    description: 'Date of registration',
    example: '2023-03-05'
  })
  public createdAt: Date;
}
