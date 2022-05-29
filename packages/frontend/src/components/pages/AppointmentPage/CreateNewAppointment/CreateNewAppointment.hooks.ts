import { useForm } from 'react-hook-form';
import { useCallback } from 'react';
import { SchedulerHelpers } from '@aldabil/react-scheduler/dist/types';
import { CreateNewAppointmentForm } from './CreateNewAppointment.types';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './CreateNewAppointment.schema';
import AppointmentService from '../../../../services/appointment.service';
import { isFailureResponse } from '@mydoctor/common/types/FailureResponse';
import { formatInTimeZone } from 'date-fns-tz';

interface UseCreateNewAppointmentProps {
  scheduler: SchedulerHelpers;
}

export const useCreateNewAppointment = ({
  scheduler,
}: UseCreateNewAppointmentProps) => {
  const event = scheduler.edited;

  const formContext = useForm<CreateNewAppointmentForm>({
    defaultValues: {
      startAt: event?.start || scheduler.state?.start?.value,
      endAt: event?.end || scheduler.state?.end?.value,
      clientEmail: event?.email,
    },
    resolver: yupResolver(schema),
  });

  const handleCreateNewAppointment = useCallback(
    async (data: CreateNewAppointmentForm) => {
      try {
        scheduler.loading(true);

        const response = event?.event_id
          ? await AppointmentService.updateAppointment({
              id: event.event_id,
              startAt: formatInTimeZone(
                data.startAt,
                'UTC',
                "yyyy-MM-dd'T'HH:mm:ss'Z'",
              ),
              endAt: formatInTimeZone(
                data.endAt,
                'UTC',
                "yyyy-MM-dd'T'HH:mm:ss'Z'",
              ),
              clientEmail: data.clientEmail,
            })
          : await AppointmentService.createNewAppointment({
              startAt: formatInTimeZone(
                data.startAt,
                'UTC',
                "yyyy-MM-dd'T'HH:mm:ss'Z'",
              ),
              endAt: formatInTimeZone(
                data.endAt,
                'UTC',
                "yyyy-MM-dd'T'HH:mm:ss'Z'",
              ),
              clientEmail: data.clientEmail,
            });

        if (isFailureResponse(response.data)) {
          return;
        }

        scheduler.onConfirm(
          {
            event_id: event?.event_id || response.data.id,
            title: `${response.data.client.lastName} ${response.data.client.firstName}`,
            start: data.startAt,
            end: data.endAt,
          },
          event?.event_id ? 'edit' : 'create',
        );
        scheduler.close();
      } finally {
        scheduler.loading(false);
      }
    },
    [event?.event_id, scheduler],
  );

  return {
    formContext,
    handleCreateNewAppointment,
  };
};
