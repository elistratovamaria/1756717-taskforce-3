import { Comment } from '@project/shared/shared-types';

export class TaskCommentEntity implements Comment {
  public _id: string;
  public message: string;
  public taskId: string;

  constructor(taskComment: Comment) {
    this.fillEntity(taskComment);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(taskComment: Comment) {
    this._id = taskComment._id;
    this.message = taskComment.message;
    this.taskId = taskComment.taskId;
  }
}
