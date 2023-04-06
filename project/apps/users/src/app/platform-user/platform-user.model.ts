import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User, UserRole, City } from '@project/shared/shared-types';

@Schema({
  collection: 'users',
  timestamps: true,
})
export class PlatformUserModel extends Document implements User {
  @Prop({
    required: true,
  })
  public name: string;

  @Prop({
    required: true,
  })
  email: string;

  @Prop({
    required: true,
    type: String,
    enum: City
  })
  city: City;

  @Prop({
    required: true,
  })
  passwordHash: string;

  @Prop({
    required: true,
    type: String,
    enum: UserRole,
  })
  role: UserRole;

  @Prop({
    default: '',
  })
  avatar?: string;

  @Prop({
    required: true,
  })
  dateBirth: Date;

  @Prop({
    default: '',
  })
  info: string;

  @Prop({
    default: [],
  })
  speciality: string[];
}

export const PlatformUserSchema = SchemaFactory.createForClass(PlatformUserModel);
