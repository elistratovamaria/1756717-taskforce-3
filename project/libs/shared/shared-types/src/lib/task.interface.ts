import { City } from './city.enum';
import { StatusTask } from './status-task.enum';

export interface Task {
  _id?: string;
  title: string;
  description: string;
  category: string;
  price?: number;
  deadline?: Date;
  image?: string;
  address?: string;
  tags?: string[];
  city: City;
  status?: StatusTask;
}
