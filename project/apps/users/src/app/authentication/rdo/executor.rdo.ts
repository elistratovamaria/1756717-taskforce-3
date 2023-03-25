import { Expose } from 'class-transformer';

export class ExecutorRdo {
  @Expose({name: '_id'})
  public id: string;

  @Expose()
  public name: string;

  @Expose()
  public dateCreate: string;

  @Expose()
  public city: string;

  @Expose()
  public age: number;

  @Expose()
  public role: string;

  @Expose()
  public rating: number;

  @Expose()
  public tasksDoneAmount: number;

  @Expose()
  public tasksFailedAmount: number;

  @Expose()
  public email: string;

  @Expose()
  public info: string;

  @Expose()
  public speciality: string[];

  @Expose()
  public placeInRating: number;
}
