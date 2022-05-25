import { useCallback } from 'react';
import { format } from 'date-fns-tz';
import AppointmentService from '../../services/appointment.service';
import { isFailureResponse } from '@mydoctor/common/types/FailureResponse';
import { adaptAppointmentDtosToAppointments } from '../../types/Appointment';
import { useCurrentUserContext } from '../../layouts/dashboard/CurrentUserContext';

export const useAppointmentPage = () => {
  const { user } = useCurrentUserContext();

  const onRemoteEvents = useCallback(
    async (query: string) => {
      const quaryParts = query.split('&');
      const startDate = new Date(quaryParts[0].replace('?start=', ''));
      const endDate = new Date(quaryParts[1].replace('?start=', ''));

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
    [user.id],
  );

  return {
    onRemoteEvents,
  };
};
