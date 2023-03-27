import { Response } from '@project/shared/shared-types';

export class TaskResponseEntity implements Response {
  public _id: string;
  public message: string;
  public taskId: string;
  public estimation: number;

  constructor(taskResponse: Response) {
    this.fillEntity(taskResponse);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(taskResponse: Response) {
    this._id = taskResponse._id;
    this.message = taskResponse.message;
    this.taskId = taskResponse.taskId;
    this.estimation = taskResponse.estimation;
  }
}
