import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomerUser } from '@project/shared/shared-types';

@Schema()

export class PlatformCustomerUserModel extends Document implements CustomerUser {
  @Prop({
    default: 0,
  })
  public tasksPublishedAmount?: number;

  @Prop({
    default: 0,
  })
  public tasksNewAmount?: number;

  @Prop({
    default: '',
  })
  public info?: string;

}

export const PlatformCustomerUserSchema = SchemaFactory.createForClass(PlatformCustomerUserModel);
