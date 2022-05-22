import { Role } from '../user/Role.entity';

export const hasRole = (roleToCheck) => (role: Role) =>
  roleToCheck === role.name;
