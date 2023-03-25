import { UserRole, City } from '@project/shared/shared-types';

export class CreateUserDto {
  public name: string;
  public email: string;
  public city: City;
  public password: string;
  public role: UserRole;
  public dateBirth: Date;
}
