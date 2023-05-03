import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ExecutorUser } from '@project/shared/shared-types';

@Schema()

export class PlatformExecutorUserModel extends Document implements ExecutorUser {
  @Prop({
    default: 0,
  })
  public age?: number;

  @Prop({
    default: 0,
  })
  public rating?: number;

  @Prop({
    default: 0,
  })
  public tasksDoneAmount?: number;

  @Prop({
    default: 0,
  })
  public tasksFailedAmount?: number;

  @Prop({
    default: '',
  })
  public info?: string;

  @Prop({
    default: '',
  })
  public speciality?: string[];

  @Prop({
    default: 0,
  })
  public placeInRating?: number;

}

export const PlatformExecutorUserSchema = SchemaFactory.createForClass(PlatformExecutorUserModel);
