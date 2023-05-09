import { Module } from '@nestjs/common';
import rabbitConfig from './config/rabbit.config';
import { ConfigModule } from '@nestjs/config';

const ENV_TASKS_FILE_PATH = 'apps/tasks/.tasks.dev.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [rabbitConfig],
      envFilePath: ENV_TASKS_FILE_PATH
    })
  ]
})
export class ConfigTasksModule { }
