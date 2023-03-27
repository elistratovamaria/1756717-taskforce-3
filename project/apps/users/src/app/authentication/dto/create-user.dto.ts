import { UserRole, City } from '@project/shared/shared-types';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'User firstname and surname',
    example: 'Ivan Smirnov'
  })
  public name: string;

  @ApiProperty({
    description: 'User unique email',
    example: 'user@user.com'
  })
  public email: string;

  @ApiProperty({
    description: 'User city',
    example: 'Москва',
    type: () => typeof City.Moscow
  })
  public city: City;

  @ApiProperty({
    description: 'User password',
    example: '123456'
  })
  public password: string;

  @ApiProperty({
    description: 'User role',
    example: 'Исполнитель',
    type: () => typeof UserRole.Customer
  })
  public role: UserRole;

  @ApiProperty({
    description: 'User birth date',
    example: '1980-01-01'
  })
  public dateBirth: Date;
}
