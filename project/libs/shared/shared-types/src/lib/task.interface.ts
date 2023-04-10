import { City } from './city.enum';
import { StatusTask } from './status-task.enum';
import { Category } from './category.interface';
import { Comment } from './comment.interface';
import { Response } from './response.interface';

export interface Task {
  id?: string;
  title: string;
  description: string;
  category: Category;
  price?: number;
  deadline?: Date;
  image?: string;
  address?: string;
  tags?: string[];
  city: City;
  status?: StatusTask;
  userId: string;
  comments?: Comment[];
  response?: Response;
}
