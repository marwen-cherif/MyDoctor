import { RoleType } from '@mydoctor/common/enums';

export interface User {
  id: string;
  email: string;
  lastName: string;
  firstName: string;
  createdAt: Date;
  lastModifiedAt?: Date;
  phone: string;
  roles: {
    id: string;
    name: RoleType;
  }[];
}
