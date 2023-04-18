import { UserRole, City } from '@project/shared/shared-types';
import { AuthUser } from '../authentication.constant';
import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601, IsString, Min, Length, IsEmail, IsEnum } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'User firstname and surname',
    example: 'Ivan Smirnov'
  })
  @IsString()
  @Length(3, 50, { message: AuthUser.NameNotValid })
  public name: string;

  @ApiProperty({
    description: 'User unique email',
    example: 'user@user.com'
  })
  @IsEmail({}, { message: AuthUser.EmailNotValid })
  public email: string;

  @ApiProperty({
    description: 'User city',
    example: 'Москва',
    type: () => typeof City.Moscow
  })
  @IsEnum(City, { message: AuthUser.CityNotValid })
  public city: City;

  @ApiProperty({
    description: 'User password',
    example: '123456'
  })
  @IsString()
  @Length(6, 12, { message: AuthUser.PasswordNotValid })
  public password: string;

  @ApiProperty({
    description: 'User role',
    example: 'Исполнитель',
    type: () => typeof UserRole.Customer
  })
  @IsEnum(UserRole, { message: AuthUser.UserRoleNotValid })
  public role: UserRole;

  @ApiProperty({
    description: 'User birth date',
    example: '1980-01-01'
  })
  @IsISO8601({}, { message: AuthUser.DateBirthNotValid })
  @Min(18, { message: AuthUser.DateBirthMinor })
  public dateBirth: Date;
}
