import { City, Category } from '@project/shared/shared-types';
import { IsNumber, IsOptional, IsIn } from 'class-validator';
import { Transform } from 'class-transformer';
import { DEFAULT_SORT_DIRECTION, DEFAULT_TASK_COUNT_LIMIT } from '../platform-task.constant';

export class TaskQuery {
  @Transform(({ value } ) => +value || DEFAULT_TASK_COUNT_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit = DEFAULT_TASK_COUNT_LIMIT;

  @Transform(({ value } ) => value.categoryId)
  @IsOptional()
  public category: Category;

  @IsOptional()
  public tag: string;

  @IsOptional()
  public city: City;

  @IsIn(['asc', 'desc'])
  @IsOptional()
  public sortDirection: 'desc' | 'asc' = DEFAULT_SORT_DIRECTION;

  @Transform(({ value }) => +value)
  @IsOptional()
  public page: number;
}
