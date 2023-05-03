import { UserRole } from './user-role.enum';
import { City } from './city.enum';
import { CustomerUser } from './customer-user.interface';
import { ExecutorUser } from './executor-user.interface';

export interface User extends CustomerUser, ExecutorUser{
  _id?: string;
  name: string;
  email: string;
  city: City;
  passwordHash: string;
  role: UserRole;
  avatar?: string;
  dateBirth: Date;
  info?: string;
  speciality?: string[];
}
