import { IsNumber, IsOptional} from 'class-validator';
import { Transform } from 'class-transformer';
import { DEFAULT_COMMENT_COUNT_LIMIT } from '../task-comment.constant';

export class TaskCommentQuery {
  @Transform(({ value } ) => +value || DEFAULT_COMMENT_COUNT_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit = DEFAULT_COMMENT_COUNT_LIMIT;

  @Transform(({ value }) => +value)
  @IsOptional()
  public page: number;
}
