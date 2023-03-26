import { Expose } from 'class-transformer';

export class TaskCommentRdo {
  @Expose({ name: '_id' })
  public id: string;

  @Expose()
  public message: string;

  @Expose()
  public taskId: string;
}
