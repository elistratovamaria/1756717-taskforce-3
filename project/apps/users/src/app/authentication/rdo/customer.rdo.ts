import { Expose } from 'class-transformer';

export class CustomerRdo {
  @Expose({name: '_id'})
  public id: string;

  @Expose()
  public name: string;

  @Expose()
  public dateCreate: string;

  @Expose()
  public city: string;

  @Expose()
  public email: string;

  @Expose()
  public tasksPublishedAmount: number;

  @Expose()
  public tasksNewAmount: number;

  @Expose()
  public info: string;

  @Expose()
  public role: string;
}
