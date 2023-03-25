import { Module } from '@nestjs/common';
import { PlatformUserModule } from './platform-user/platform-user.module';
import { AuthenticationModule } from './authentication/authentication.module';

@Module({
  imports: [PlatformUserModule, AuthenticationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
