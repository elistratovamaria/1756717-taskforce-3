import { City, StatusTask, Task, Comment, /*Response*/ } from '@project/shared/shared-types';

export class PlatformTaskEntity implements Task {
  public id: number;
  public title: string;
  public description: string;
  public category: string;
  public price?: number;
  public deadline?: Date;
  public image?: string;
  public address?: string;
  public tags?: string[];
  public city: any;
  public status: any;
  public userId: string;
  /*public response?: Response;*/
  public comments?: Comment[];

  constructor(platformTask: Task) {
    this.fillEntity(platformTask);
  }

  public toObject(): PlatformTaskEntity {
    return {
      ...this,
      comments: this.comments.map(({ id }) => ({ id }))
    };
  }

  public fillEntity(platformTask: Task): void {
    this.id = platformTask.id;
    this.title = platformTask.title;
    this.description = platformTask.description;
    this.category = platformTask.category;
    this.price = platformTask.price;
    this.deadline = platformTask.deadline;
    this.image = platformTask.image;
    this.address = platformTask.address;
    this.tags = platformTask.tags;
    this.city = platformTask.city;
    this.status = platformTask.status;
    this.userId = platformTask.userId;
    this.comments = [];
    /*this.response = platformTask.response;*/
  }
}
