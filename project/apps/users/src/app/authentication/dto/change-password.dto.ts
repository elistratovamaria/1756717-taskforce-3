import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AuthUserValidationMessage, UserSetting } from '../authentication.constant';

export class ChangePasswordDto {
  @ApiProperty({
    description: 'Old password',
    example: '123456',
  })
  @IsString()
  @Length(UserSetting.PasswordMinLength, UserSetting.PasswordMaxLength, { message: AuthUserValidationMessage.PasswordNotValid})
  oldPassword: string;

  @ApiProperty({
    description: 'New password',
    example: '1234567',
  })
  @IsString()
  @Length(UserSetting.PasswordMinLength, UserSetting.PasswordMaxLength, { message: AuthUserValidationMessage.PasswordNotValid})
  newPassword: string;
}
