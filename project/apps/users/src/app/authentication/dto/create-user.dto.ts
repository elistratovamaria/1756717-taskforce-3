import { UserRole, City } from '@project/shared/shared-types';
import { AuthUserValidationMessage, UserSetting } from '../authentication.constant';
import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601, IsString, Length, IsEmail, IsEnum } from 'class-validator';
import { MinimumValidAge } from '../validators/age.validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'User firstname and surname',
    example: 'Ivan Smirnov'
  })
  @IsString()
  @Length(UserSetting.NameMinLength, UserSetting.NameMaxLength, { message: AuthUserValidationMessage.NameNotValid })
  public name: string;

  @ApiProperty({
    description: 'User unique email',
    example: 'user@user.com'
  })
  @IsEmail({}, { message: AuthUserValidationMessage.EmailNotValid })
  public email: string;

  @ApiProperty({
    description: 'User city',
    example: 'Moscow',
    type: () => typeof City.Moscow
  })
  @IsEnum(City, { message: AuthUserValidationMessage.CityNotValid })
  public city: City;

  @ApiProperty({
    description: 'User password',
    example: '123456'
  })
  @IsString()
  @Length(UserSetting.PasswordMinLength, UserSetting.PasswordMaxLength, { message: AuthUserValidationMessage.PasswordNotValid })
  public password: string;

  @ApiProperty({
    description: 'User role',
    example: 'Executor',
    type: () => typeof UserRole.Customer
  })
  @IsEnum(UserRole, { message: AuthUserValidationMessage.UserRoleNotValid })
  public role: UserRole;

  @ApiProperty({
    description: 'User birth date',
    example: '1980-01-01'
  })
  @IsISO8601({}, { message: AuthUserValidationMessage.DateBirthNotValid })
  @MinimumValidAge(UserSetting.MinimumAge, { message: AuthUserValidationMessage.DateBirthMinor})
  public dateBirth: Date;
}
