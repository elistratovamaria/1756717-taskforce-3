import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserRdo {
  @ApiProperty({
    description: 'The unique user ID',
    example: '22'
  })
  @Expose({ name: '_id' })
  public id: string;

  @ApiProperty({
    description: 'User name',
    example: 'Ivan Smirnov'
  })
  @Expose()
  public name: string;

  @ApiProperty({
    description: 'User unique email',
    example: 'user@user.com'
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: 'User city',
    example: 'Москва'
  })
  @Expose()
  public city: string;

  @ApiProperty({
    description: 'User role',
    example: 'Исполнитель'
  })
  @Expose()
  public role: string;

  @ApiProperty({
    description: 'User avatar path',
    example: '/images/user.png'
  })
  @Expose()
  public avatar: string;

  @ApiProperty({
    description: 'User birth date',
    example: '1980-01-01'
  })
  @Expose()
  public dateBirth: string;

  @ApiProperty({
    description: 'User info',
    example: 'Lorem ipsum dolor sit amet'
  })
  public info: string;

  @ApiProperty({
    description: 'User speciality',
    example: 'WebDev, PHP, Laravel'
  })
  public speciality: string[];
}
