import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlatformUserModel, PlatformUserSchema } from './platform-user.model';
import { PlatformUserRepository } from './platform-user.repository';

@Module({
  imports: [MongooseModule.forFeature([
    { name: PlatformUserModel.name, schema: PlatformUserSchema}
  ])],
  providers: [PlatformUserRepository],
  exports: [PlatformUserRepository],
})
export class PlatformUserModule {}
