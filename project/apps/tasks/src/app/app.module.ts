import { Module } from '@nestjs/common';
import { PlatformTaskModule } from './platform-task/platform-task.module';

@Module({
  imports: [PlatformTaskModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
