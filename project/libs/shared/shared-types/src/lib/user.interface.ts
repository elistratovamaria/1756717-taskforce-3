import { UserRole } from './user-role.enum';
import { City } from './city.enum';

export interface User {
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
