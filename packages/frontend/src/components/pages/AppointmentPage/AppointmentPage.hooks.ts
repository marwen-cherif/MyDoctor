import { useCallback, useState } from 'react';
import { format } from 'date-fns-tz';
import AppointmentService from '../../../services/AppointmentService';
import { isFailureResponse } from '@mydoctor/common/types/FailureResponse';
import { adaptAppointmentDtosToAppointments } from '../../../types/Appointment';
import { useCurrentUserContext } from '../../../layouts/dashboard/CurrentUserContext';
import { useIntl } from 'react-intl';
import { useMutation, useQuery } from 'react-query';

export const useAppointmentPage = () => {
  const { user } = useCurrentUserContext();
  const intl = useIntl();
  const [query, setQuery] = useState('');

  const queryKeys = ['getAppointments', query];

  const {
    data: appointments,
    isLoading: isGetAppointmentsLoading,
    refetch,
  } = useQuery(
    queryKeys,
    async () => {
      if (!query) {
        return [];
      }

      const queryParts = query.split('&');
      const startDate = new Date(queryParts[0].replace('?start=', ''));
      const endDate = new Date(queryParts[1].replace('?start=', ''));

      const result = await AppointmentService.getAppointments({
        doctorId: user.id,
        start: format(startDate, "yyyy-MM-dd'T'HH:mm:ss'Z'"),
        end: format(endDate, "yyyy-MM-dd'T'HH:mm:ss'Z'"),
      });
      const { data } = result;

      if (isFailureResponse(data)) {
        // eslint-disable-next-line no-console
        console.error(data.reason);

        return [];
      }

      return adaptAppointmentDtosToAppointments(data);
    },
    {
      staleTime: 60000,
    },
  );

  const {
    mutateAsync: handleDeleteAppointment,
    isLoading: isDeletingAppointment,
  } = useMutation('deleteAppointment', async (deletedId: string | number) => {
    const response = await AppointmentService.deleteAppointment({
      id: deletedId,
    });

    if (isFailureResponse(response)) {
      throw new Error(
        intl.formatMessage({
          id: 'general.internalError',
          defaultMessage: 'Got an internal error',
        }),
      );
    }

    await refetch();

    return undefined;
  });

  const handleRemoteEvents = useCallback(async (query: string) => {
    setQuery(query);
  }, []);

  return {
    handleRemoteEvents,
    appointments,
    isGetAppointmentsLoading,
    handleDeleteAppointment,
    isDeletingAppointment,
  };
};
