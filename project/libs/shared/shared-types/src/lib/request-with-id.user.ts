import { UserRole } from './user-role.enum';

export interface RequestWithIdUser {
  id: string;
  email: string;
  role: UserRole;
  name: string;
}
