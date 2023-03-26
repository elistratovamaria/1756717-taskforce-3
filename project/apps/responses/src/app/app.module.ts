import { Module } from '@nestjs/common';
import { TaskResponseModule } from './task-response/task-response.module';

@Module({
  imports: [TaskResponseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
