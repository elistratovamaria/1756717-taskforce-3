import { Module } from '@nestjs/common';
import { TaskCommentModule } from './task-comment/task-comment.module';

@Module({
  imports: [TaskCommentModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
