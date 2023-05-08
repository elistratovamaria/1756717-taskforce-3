import { Comment } from './comment.interface';
import { Response } from './response.interface';
import { Reply } from './reply.interface';

export interface Task {
  id?: number;
  title: string;
  description: string;
  categoryId: number;
  price?: number;
  deadline?: Date;
  image?: string;
  address?: string;
  tags?: string[];
  city: string;
  status?: string;
  userId: string;
  executorId?: string;
  hasResponse: boolean;
  comments?: Comment[];
  response?: Response;
  replies?: Reply[];
}
