import { IsString, IsInt } from 'class-validator';

export class AdditionalInfoDto {
  @IsString()
  public userId: string;

  @IsInt()
  public rating: number;
}
