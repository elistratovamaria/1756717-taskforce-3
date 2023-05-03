import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User, UserRole, City } from '@project/shared/shared-types';

@Schema({
  collection: 'users',
  timestamps: true,
  discriminatorKey: 'role'
})
export class PlatformUserModel extends Document implements User {
  @Prop({
    required: true,
  })
  public name: string;

  @Prop({
    required: true,
  })
  public email: string;

  @Prop({
    required: true,
    type: String,
    enum: City
  })
  public city: City;

  @Prop({
    required: true,
  })
  public passwordHash: string;

  @Prop({
    required: true,
    type: String,
    enum: UserRole,
  })
  public role: UserRole;

  @Prop({
    default: '',
  })
  public avatar?: string;

  @Prop({
    required: true,
  })
  public dateBirth: Date;

  @Prop({
    default: '',
  })
  public info: string;

  @Prop({
    default: [],
  })
  public speciality: string[];
}

export const PlatformUserSchema = SchemaFactory.createForClass(PlatformUserModel);
