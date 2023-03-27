import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class LoggedUserRdo {
  @ApiProperty({
    description: 'The unique user ID',
    example: '22'
  })
  @Expose({ name: '_id' })
  public id: string;

  @ApiProperty({
    description: 'User unique email',
    example: 'user@user.com'
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: 'Access token',
    example: 'axvidn1fkgnl'
  })
  @Expose()
  public accessToken: string;
}
