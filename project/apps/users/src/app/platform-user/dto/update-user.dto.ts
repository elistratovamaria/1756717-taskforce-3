import { City } from '@project/shared/shared-types';
import { ApiProperty } from '@nestjs/swagger';
import { ArrayMaxSize, ArrayUnique, IsString, Length, IsEnum, IsISO8601, Min, IsOptional, MaxLength } from 'class-validator';
import { PlatformUser } from '../platform-user.constant';

export class UpdateUserDto {
  @ApiProperty({
    description: 'User firstname and surname',
    example: 'Ivan Smirnov'
  })
  @IsOptional()
  @IsString()
  @Length(3, 50, { message: PlatformUser.NameNotValid })
  public name: string;

  @ApiProperty({
    description: 'User city',
    example: 'Москва',
    type: () => typeof City.Moscow
  })
  @IsOptional()
  @IsEnum(City, { message: PlatformUser.CityNotValid })
  public city: City;

  @ApiProperty({
    description: 'User birth date',
    example: '1980-01-01'
  })
  @IsOptional()
  @IsISO8601({}, { message: PlatformUser.DateBirthNotValid })
  @Min(18, { message: PlatformUser.DateBirthMinor })
  public dateBirth: Date;

  @ApiProperty({
    description: 'User info',
    example: 'Lorem ipsum dolor sit amet'
  })
  @IsOptional()
  @MaxLength(300, {message: PlatformUser.InfoNotValid})
  public info: string;

  @ApiProperty({
    description: 'User speciality',
    example: 'Webdev, PHP, Laravel'
  })
  @IsOptional()
  @ArrayMaxSize(5, {message: PlatformUser.SpecialityLength})
  @ArrayUnique({}, {message: PlatformUser.SpecialityUnique})
  public speciality: string[];
}
