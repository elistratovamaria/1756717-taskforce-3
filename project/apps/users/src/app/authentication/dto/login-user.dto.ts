import { ApiProperty } from '@nestjs/swagger/dist/index';

export class LoginUserDto {
  @ApiProperty({
    description: 'User unique email',
    example: 'user@user.com'
  })
  public email: string;

  @ApiProperty({
    description: 'User password',
    example: '123456'
  })
  public password: string;
}
