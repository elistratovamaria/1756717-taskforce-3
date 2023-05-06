import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from '@project/shared/shared-types';
import { TaskCategoryRepository } from './task-category.repository';
import { ConflictException, Injectable } from '@nestjs/common';
import { TaskCategoryEntity } from './task-category.entity';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { TaskCategoryException } from './task-category.constant';

@Injectable()
export class TaskCategoryService {
  constructor(
    private readonly taskCategoryRepository: TaskCategoryRepository
  ) {}

  async createCategory(dto: CreateCategoryDto): Promise<Category> {
    const categories = await this.taskCategoryRepository.find();
    const categoriesTitles = categories.map((category) => category.title);

    if (categoriesTitles.includes(dto.title)) {
      throw new ConflictException(TaskCategoryException.CategoryExists);
    }

    const categoryEntity = new TaskCategoryEntity(dto);
    return this.taskCategoryRepository.create(categoryEntity);
  }

  async deleteCategory(id: number): Promise<void> {
    this.taskCategoryRepository.destroy(id);
  }

  async getCategory(id: number): Promise<Category> {
    return this.taskCategoryRepository.findById(id);
  }

  async getCategories(): Promise<Category[]> {
    return this.taskCategoryRepository.find();
  }

  async updateCategory(id: number, dto: UpdateCategoryDto): Promise<Category> {
    return this.taskCategoryRepository.update(id, new TaskCategoryEntity(dto));
  }
}
