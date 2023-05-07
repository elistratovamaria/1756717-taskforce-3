import { Reply } from '@project/shared/shared-types';

export class TaskReplyEntity implements Reply {
  public id: number;
  public taskId: number;
  public userId: string;

  constructor(taskReply: Reply) {
    this.fillEntity(taskReply);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(taskReply: Reply) {
    this.id = taskReply.id;
    this.taskId = taskReply.taskId;
    this.userId = taskReply.userId;
  }
}
