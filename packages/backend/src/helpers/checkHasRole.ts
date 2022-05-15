import { Role } from '../user/Role';

export const hasRole = (roleToCheck) => (role: Role) =>
  roleToCheck === role.name;
