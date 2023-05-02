import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { TaskCategoryModule } from './task-category/task-category.module';
import { PlatformTaskModule } from './platform-task/platform-task.module';
import { TaskCommentModule } from './task-comment/task-comment.module';
import { TaskResponseModule } from './task-response/task-response.module';

@Module({
  imports: [
    PrismaModule,
    TaskCategoryModule,
    PlatformTaskModule,
    TaskCommentModule,
    TaskResponseModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
