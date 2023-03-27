import { Module } from '@nestjs/common';
import { PlatformUserMemoryRepository } from './platform-user-memory.repository';

@Module({
  providers: [PlatformUserMemoryRepository],
  exports: [PlatformUserMemoryRepository],
})
export class PlatformUserModule {}
