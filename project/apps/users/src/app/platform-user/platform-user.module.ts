import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlatformUserModel, PlatformUserSchema } from './platform-user.model';
import { PlatformUserRepository } from './platform-user.repository';
import { PlatformUserService } from './platform-user.service';
import { PlatformUserController } from './platform-user.controller';

@Module({
  imports: [MongooseModule.forFeature([
    { name: PlatformUserModel.name, schema: PlatformUserSchema}
  ])],
  controllers: [PlatformUserController],
  providers: [PlatformUserRepository, PlatformUserService],
  exports: [PlatformUserRepository],
})
export class PlatformUserModule {}
