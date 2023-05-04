import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { TasksController } from './tasks.controller';

@Module({
  imports: [],
  controllers: [],
  providers: [
    UsersController,
    TasksController
  ],
})
export class AppModule {}
