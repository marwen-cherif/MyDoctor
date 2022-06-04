import { useForm } from 'react-hook-form';
import { useCallback } from 'react';
import { SchedulerHelpers } from '@aldabil/react-scheduler/dist/types';
import { CreateNewAppointmentForm } from './CreateNewAppointment.types';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './CreateNewAppointment.schema';
import AppointmentService from '../../../../services/AppointmentService';
import { isFailureResponse } from '@mydoctor/common/types/FailureResponse';
import { formatInTimeZone } from 'date-fns-tz';
import UserService from '../../../../services/UserService';

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
      search: undefined,
      client: {
        email: event?.client.email,
        lastName: event?.client.lastname,
        firstName: event?.client.firstName,
        phone: event?.client.phone,
        phoneCountryPrefix: event?.client.phoneCountryPrefix || '+216',
      },
    },
    resolver: yupResolver(schema),
  });

  const handleCreateNewAppointment = useCallback(
    async (data: CreateNewAppointmentForm) => {
      try {
        scheduler.loading(true);

        const upsertClientResponse = await UserService.upsertClient({
          firstName: data.client.firstName,
          id: data.search.data?.id,
          lastName: data.client.lastName,
          phone: data.client.phone,
          phoneCountryPrefix: data.client.phoneCountryPrefix,
          email: data.client.email,
        });

        if (isFailureResponse(upsertClientResponse.data)) {
          return;
        }

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
              clientId: upsertClientResponse.data.id,
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
