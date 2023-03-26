import { City } from '@project/shared/shared-types';

export class CreateTaskDto {
  public title: string;
  public description: string;
  public category: string;
  public price?: number;
  public deadline?: Date;
  public image?: string;
  public address?: string;
  public tags?: string[];
  public city: City;
}
