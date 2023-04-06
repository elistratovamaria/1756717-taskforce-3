import { Injectable } from '@nestjs/common';
import { PlatformUserRepository } from '../platform-user/platform-user.repository';

@Injectable()
export class PlatformUserService {
  constructor(
    private readonly platformUserRepository: PlatformUserRepository
  ) {}

  public async getUser(id: string) {
    return this.platformUserRepository.findById(id);
  }
}
