import { City, Task } from '@project/shared/shared-types';

export class PlatformTaskEntity implements Task {
  public _id: string;
  public title: string;
  public description: string;
  public category: string;
  public price?: number;
  public deadline?: Date;
  public image?: string;
  public address?: string;
  public tags?: string[];
  public city: City;

  constructor(platformTask: Task) {
    this.fillEntity(platformTask);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(platformTask: Task) {
    this._id = platformTask._id;
    this.title = platformTask.title;
    this.description = platformTask.description;
    this.category = platformTask.category;
    this.price = platformTask.price;
    this.deadline = platformTask.deadline;
    this.image = platformTask.image;
    this.address = platformTask.address;
    this.tags = platformTask.tags;
    this.city = platformTask.city;
  }
}
