import { RoleType } from '@mydoctor/common/enums';
import { parseISO } from 'date-fns';
import { User } from '../../types/User';

export const adaptUserProfile = (profile: {
  id: string;
  email: string;
  lastName: string;
  firstName: string;
  createdAt: string;
  lastModifiedAt?: string;
  phone: string;
  roles: {
    id: string;
    name: RoleType;
  }[];
}): User => {
  return {
    ...profile,
    createdAt: parseISO(profile.createdAt),
    lastModifiedAt: profile.lastModifiedAt
      ? parseISO(profile.lastModifiedAt)
      : undefined,
  };
};
