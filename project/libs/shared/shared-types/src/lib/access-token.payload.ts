import { UserRole } from './user-role.enum';

export interface AccessTokenPayload {
  id: string;
  email: string;
  role: UserRole;
  name: string;
}
