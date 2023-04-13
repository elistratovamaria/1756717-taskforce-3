import { City } from './city.enum';
import { StatusTask } from './status-task.enum';
import { Comment } from './comment.interface';
import { Response } from './response.interface';

export interface Task {
  id?: number;
  title: string;
  description: string;
  category: string;
  price?: number;
  deadline?: Date;
  image?: string;
  address?: string;
  tags?: string[];
  city: any;
  status?: any;
  userId: string;
  comments?: Comment[];
  response?: Response;
}
