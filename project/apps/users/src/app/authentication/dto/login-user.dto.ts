import { ApiProperty } from '@nestjs/swagger/dist/index';
import { AuthUser } from '../authentication.constant';
import { IsString, Length, IsEmail } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    description: 'User unique email',
    example: 'user@user.com'
  })
  @IsEmail({}, { message: AuthUser.EmailNotValid })
  public email: string;

  @ApiProperty({
    description: 'User password',
    example: '123456'
  })
  @IsString()
  @Length(6, 12, { message: AuthUser.PasswordNotValid })
  public password: string;
}
