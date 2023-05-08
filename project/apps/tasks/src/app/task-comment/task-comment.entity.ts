import { Comment } from '@project/shared/shared-types';

export class TaskCommentEntity implements Comment {
  public id: number;
  public message: string;
  public taskId: number;
  public userId: string;

  constructor(taskComment: Comment) {
    this.fillEntity(taskComment);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(taskComment: Comment) {
    this.id = taskComment.id;
    this.message = taskComment.message;
    this.taskId = taskComment.taskId;
    this.userId = taskComment.userId;
  }
}
