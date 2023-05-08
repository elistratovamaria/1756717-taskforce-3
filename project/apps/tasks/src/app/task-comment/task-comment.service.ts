import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { TaskCommentRepository } from './task-comment.repository';
import { JwtService } from '@nestjs/jwt';
import { TaskCommentException } from './task-comment.constant';

@Injectable()
export class TaskCommentService {
  constructor(
    private readonly taskCommentRepository: TaskCommentRepository,
    private readonly jwtService: JwtService
  ) {}

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
}
