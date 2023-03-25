import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CustomerRdo {
  @ApiProperty({
    description: 'The unique user ID',
    example: '22'
  })
  @Expose({name: '_id'})
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
    description: 'User unique email',
    example: 'user@user.com'
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: 'User published tasks amount',
    example: 15,
  })
  @Expose()
  public tasksPublishedAmount: number;

  @ApiProperty({
    description: 'User new tasks amount',
    example: 3
  })
  @Expose()
  public tasksNewAmount: number;

  @ApiProperty({
    description: 'Information about the user',
    example: 'Lorem ipsum'
  })
  @Expose()
  public info: string;

  @ApiProperty({
    description: 'User role',
    example: 'Исполнитель'
  })
  @Expose()
  public role: string;
}
