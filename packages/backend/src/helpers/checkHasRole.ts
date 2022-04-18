import { Role } from '../entity/Role';

export const hasRole = (roleToCheck) => (role: Role) =>
  roleToCheck === role.name;
