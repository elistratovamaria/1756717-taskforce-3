import { Injectable } from '@nestjs/common';
import { TaskCommentRepository } from './task-comment.repository';
import { CreateCommentDto } from './dto/create-comment.dto';
import { TaskCommentEntity } from './task-comment.entity';
import { TaskCommentQuery } from './query/task-comment.query';

@Injectable()
export class TaskCommentService {
  constructor(
    private readonly taskCommentRepository: TaskCommentRepository,
  ) {}

  public async createComment(dto: CreateCommentDto, taskId: number) {
    const commentEntity = new TaskCommentEntity(dto);
    commentEntity.taskId = taskId;

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

  public async getComments(query: TaskCommentQuery, taskId: number) {
    return this.taskCommentRepository.find(query, taskId);
  }
}
