import { Response } from '@project/shared/shared-types';

export class TaskResponseEntity implements Response {
  public id: number;
  public message: string;
  public taskId: number;
  public userId: string;
  public estimation: number;

  constructor(taskResponse: Response) {
    this.fillEntity(taskResponse);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(taskResponse: Response) {
    this.id = taskResponse.id;
    this.message = taskResponse.message;
    this.taskId = taskResponse.taskId;
    this.userId = taskResponse.userId;
    this.estimation = taskResponse.estimation;
  }
}
