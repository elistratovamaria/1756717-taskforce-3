import { City, StatusTask } from '@project/shared/shared-types';

export class TaskDto {
  public id: string;
  public title: string;
  public description: string;
  public category: string;
  public price?: number;
  public deadline?: Date;
  public image?: string;
  public address?: string;
  public tags?: string[];
  public city: City;
  public status: StatusTask;
}
