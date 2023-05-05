import { City, StatusTask, Task, Comment, Reply } from '@project/shared/shared-types';

export class PlatformTaskEntity implements Task {
  public id: number;
  public title: string;
  public description: string;
  public categoryId: number;
  public price?: number;
  public deadline?: Date;
  public image?: string;
  public address?: string;
  public tags?: string[];
  public city: string;
  public status: string;
  public userId: string;
  public executorId?: string;
  public comments?: Comment[];
  public hasResponse: boolean;
  public replies?: Reply[];

  constructor(platformTask: Task) {
    this.fillEntity(platformTask);
  }

  public toObject(): PlatformTaskEntity {
    return {
      ...this,
      comments: [...this.comments],
    };
  }

  public fillEntity(platformTask: Task): void {
    this.id = platformTask.id;
    this.title = platformTask.title;
    this.description = platformTask.description;
    this.categoryId = platformTask.categoryId;
    this.price = platformTask.price;
    this.deadline = platformTask.deadline;
    this.image = platformTask.image;
    this.address = platformTask.address;
    this.tags = platformTask.tags;
    this.city = platformTask.city;
    this.status = platformTask.status;
    this.userId = platformTask.userId;
    this.executorId = platformTask.executorId;
    this.comments = [];
    this.hasResponse = platformTask.hasResponse;
    this.replies = platformTask.replies;
  }
}
