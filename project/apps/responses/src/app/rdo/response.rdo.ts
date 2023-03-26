import { Expose } from 'class-transformer';

export class ResponseRdo {
  @Expose({name: '_id'})
  public id: string;

  @Expose()
  message: string;

  @Expose()
  taskId: string;

  @Expose()
  estimation: number;
}
