import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlatformUserModel, PlatformUserSchema } from './platform-user.model';
import { PlatformUserRepository } from './platform-user.repository';
import { UserRole } from '@project/shared/shared-types';
import { PlatformCustomerUserSchema } from './platform-customer-user.model';
import { PlatformExecutorUserSchema } from './platform-executor-user.model';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: PlatformUserModel.name,
      schema: PlatformUserSchema,
      discriminators: [
        { name: UserRole.Customer, schema: PlatformCustomerUserSchema },
        { name: UserRole.Executor, schema: PlatformExecutorUserSchema }
      ]
    }
  ])],
  providers: [PlatformUserRepository],
  exports: [PlatformUserRepository],
})
export class PlatformUserModule { }
