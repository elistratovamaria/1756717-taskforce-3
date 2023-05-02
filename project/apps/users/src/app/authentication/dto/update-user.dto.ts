import { City } from '@project/shared/shared-types';
import { ApiProperty } from '@nestjs/swagger';
import { ArrayMaxSize, IsString, Length, IsEnum, IsISO8601, IsOptional, MaxLength } from 'class-validator';
import { AuthUserValidationMessage, UserSetting } from '../authentication.constant';
import { MinimumValidAge } from '../validators/age.validator';

export class UpdateUserDto {
  @ApiProperty({
    description: 'User firstname and surname',
    example: 'Ivan Smirnov'
  })
  @IsOptional()
  @IsString()
  @Length(UserSetting.NameMinLength, UserSetting.NameMaxLength, { message: AuthUserValidationMessage.NameNotValid })
  public name: string;

  @ApiProperty({
    description: 'User city',
    example: 'Москва',
    type: () => typeof City.Moscow
  })
  @IsOptional()
  @IsEnum(City, { message: AuthUserValidationMessage.CityNotValid })
  public city: City;

  @ApiProperty({
    description: 'User birth date',
    example: '1980-01-01'
  })
  @IsOptional()
  @IsISO8601({}, { message: AuthUserValidationMessage.DateBirthNotValid })
  @MinimumValidAge(UserSetting.MinimumAge, { message: AuthUserValidationMessage.DateBirthMinor})
  public dateBirth: Date;

  @ApiProperty({
    description: 'User info',
    example: 'Lorem ipsum dolor sit amet'
  })
  @IsOptional()
  @MaxLength(UserSetting.InfoMaxLength, {message: AuthUserValidationMessage.InfoNotValid})
  public info: string;

  @ApiProperty({
    description: 'User speciality',
    example: 'Webdev, PHP, Laravel'
  })
  @IsOptional()
  @ArrayMaxSize(UserSetting.SpecialityMaxAmount, {message: AuthUserValidationMessage.SpecialityAmount})
  public speciality: string[];
}
