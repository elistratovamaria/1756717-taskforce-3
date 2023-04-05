import { Module } from '@nestjs/common';
import { PlatformUserModule } from './platform-user/platform-user.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { ConfigUsersModule } from '@project/config/config-users';

@Module({
  imports: [PlatformUserModule, AuthenticationModule, ConfigUsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
