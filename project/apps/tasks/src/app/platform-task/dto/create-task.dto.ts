import { City } from '@project/shared/shared-types';
import { ApiProperty } from '@nestjs/swagger';
import { PlatformTaskValidationMessage } from '../platform-task.constant';
import { IsISO8601, IsString, Min, Length, ArrayMaxSize, IsEnum, IsOptional, MinDate, Matches} from 'class-validator';


export class CreateTaskDto {
  @ApiProperty({
    description: 'Task title',
    example: 'Клининг помещения'
  })
  @IsString()
  @Length(20, 50, {message: PlatformTaskValidationMessage.TitleNotValid})
  public title: string;

  @ApiProperty({
    description: 'Task description',
    example: 'Выполнить клининг офисного помещения'
  })
  @IsString()
  @Length(100, 1024, {message: PlatformTaskValidationMessage.DescriptionNotValid})
  public description: string;

  @ApiProperty({
    description: 'Task category',
    example: 'Клининг'
  })
  @IsString()
  public category: string;

  @ApiProperty({
    description: 'Task price',
    example: 1000
  })
  @IsOptional()
  @Min(0, {message: PlatformTaskValidationMessage.PriceNotValid})
  public price?: number;

  @ApiProperty({
    description: 'Task deadline',
    example: '2023-03-30'
  })
  @IsOptional()
  @IsISO8601({}, {message: PlatformTaskValidationMessage.DeadlineNotValid})
  @MinDate(new Date(), {message: PlatformTaskValidationMessage.DeadlineNotValid})
  public deadline?: Date;

  @ApiProperty({
    description: 'Task picture',
    example: '/img/img.png'
  })
  @IsOptional()
  @IsString()
  @Matches(/\.(jpe?g|png)$/i, {message: PlatformTaskValidationMessage.ImageNotValid})
  public image?: string;

  @ApiProperty({
    description: 'Address where task should be done',
    example: 'Санкт-Петербург, наб. реки Карповки, д.5 литера П'
  })
  @IsOptional()
  @Length(10, 255, {message: PlatformTaskValidationMessage.AddressNotValid})
  public address?: string;

  @ApiProperty({
    description: 'Task tags',
    example: ['быстро', 'дешёво']
  })
  @IsOptional()
  @ArrayMaxSize(5, {message: PlatformTaskValidationMessage.TagsAmountNotValid})
  @Length(3, 10, {each: true})
  public tags?: string[];

  @ApiProperty({
    description: 'Task city',
    example: 'Москва',
    type: () => typeof City.Moscow
  })
  @IsEnum(City, { message: PlatformTaskValidationMessage.CityNotValid })
  public city: City;
}
