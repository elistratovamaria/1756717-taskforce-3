import { Controller } from '@nestjs/common';
import { PlatformTaskService } from './platform-task.service';

@Controller('tasks')
export class PlatformTaskController {
  constructor(
    private readonly taskService: PlatformTaskService
  ) {}
}
