import { Expose } from 'class-transformer';

export class TaskRdo {
  @Expose({name: '_id'})
  public id: string;

  @Expose()
  public title: string;

  @Expose()
  public description: string;

  @Expose()
  public category: string;

  @Expose()
  public price: number;

  @Expose()
  public deadline: string;

  @Expose()
  public image: string;

  @Expose()
  public address: string;

  @Expose()
  public tags: string[];

  @Expose()
  public city: string;
}
