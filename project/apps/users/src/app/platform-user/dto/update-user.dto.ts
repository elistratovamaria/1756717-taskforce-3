import { City } from '@project/shared/shared-types';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    description: 'User firstname and surname',
    example: 'Ivan Smirnov'
  })
  public name: string;

  @ApiProperty({
    description: 'User city',
    example: 'Москва',
    type: () => typeof City.Moscow
  })
  public city: City;

  @ApiProperty({
    description: 'User birth date',
    example: '1980-01-01'
  })
  public dateBirth: Date;

  @ApiProperty({
    description: 'User info',
    example: 'Lorem ipsum dolor sit amet'
  })
  public info: string;

  @ApiProperty({
    description: 'User speciality',
    example: 'Webdev, PHP, Laravel'
  })
  public speciality: string[];
}
