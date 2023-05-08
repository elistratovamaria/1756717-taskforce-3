import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { TaskCommentRepository } from './task-comment.repository';
import { CreateCommentDto } from './dto/create-comment.dto';
import { TaskCommentEntity } from './task-comment.entity';
import { TaskCommentQuery } from './query/task-comment.query';
import { JwtService } from '@nestjs/jwt';
import { TaskCommentException } from './task-comment.constant';

@Injectable()
export class TaskCommentService {
  constructor(
    private readonly taskCommentRepository: TaskCommentRepository,
    private readonly jwtService: JwtService
  ) {}

  public async createComment(dto: CreateCommentDto, taskId: number, token?: string) {
    const user = this.jwtService.decode(token);

    if (!user) {
      throw new UnauthorizedException(TaskCommentException.Unauthorized);
    }

    const commentEntity = new TaskCommentEntity({...dto, userId: user['sub'], taskId});

    return this.taskCommentRepository
      .create(commentEntity);
  }

  public async getComment(id: number) {
    return this.taskCommentRepository.findById(id);
  }

  public async deleteComment(id: number, token?: string) {
    const user = this.jwtService.decode(token);
    const comment = await this.taskCommentRepository.findById(id);

    if (!user) {
      throw new UnauthorizedException(TaskCommentException.Unauthorized);
    }

    if (user['sub'] !== comment.userId) {
      throw new ForbiddenException(TaskCommentException.Forbidden);
    }

    this.taskCommentRepository.destroy(id);
  }

  public async deleteCommentByTaskId(taskId: number) {
    this.taskCommentRepository.destroyByTaskId(taskId);
  }

  public async getComments(query: TaskCommentQuery, taskId: number) {
    return this.taskCommentRepository.find(query, taskId);
  }
}
