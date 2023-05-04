import { Injectable } from '@nestjs/common';
import { TaskCommentRepository } from './task-comment.repository';
import { CreateCommentDto } from './dto/create-comment.dto';
import { TaskCommentEntity } from './task-comment.entity';

@Injectable()
export class TaskCommentService {
  constructor(
    private readonly taskCommentRepository: TaskCommentRepository
  ) {}

  public async createComment(dto: CreateCommentDto) {
    const commentEntity = new TaskCommentEntity(dto);

    return this.taskCommentRepository
      .create(commentEntity);
  }

  public async getComment(id: number) {
    return this.taskCommentRepository.findById(id);
  }

  public async deleteComment(id: number) {
    this.taskCommentRepository.destroy(id);
  }

  public async deleteCommentByTaskId(taskId: number) {
    this.taskCommentRepository.destroyByTaskId(taskId);
  }
}
