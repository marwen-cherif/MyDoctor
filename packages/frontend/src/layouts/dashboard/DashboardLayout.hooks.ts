import { useQuery } from 'react-query';
import UserService from '../../services/AppService';
import { adaptUserProfile } from './DashboardLayout.adapters';

export const useDashboardLayout = () => {
  const { data: userProfile, isLoading } = useQuery(
    ['getProfile'],
    async () => {
      const response = await UserService.getProfile();

      if (response.status !== 200) {
        throw new Error(response.statusText);
      }

      return adaptUserProfile(response.data);
    },
    {
      staleTime: Infinity,
      retry: 5,
      retryDelay: 1000,
    },
  );

  return {
    userProfile,
    isLoading,
  };
};
