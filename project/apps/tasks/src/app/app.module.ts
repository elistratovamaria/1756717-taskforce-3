import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { TaskCategoryModule } from './task-category/task-category.module';
import { PlatformTaskModule } from './platform-task/platform-task.module';

@Module({
  imports: [PrismaModule, TaskCategoryModule, PlatformTaskModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
