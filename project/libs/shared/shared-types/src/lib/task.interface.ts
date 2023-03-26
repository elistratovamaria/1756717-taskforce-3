import { City } from './city.enum';

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
}
