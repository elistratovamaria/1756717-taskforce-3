import { Injectable } from '@nestjs/common';
import { PlatformUserMemoryRepository } from '../platform-user/platform-user-memory.repository';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly platformUserRepository: PlatformUserMemoryRepository
  ) {}
}
