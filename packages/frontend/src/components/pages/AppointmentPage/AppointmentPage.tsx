import { FC } from 'react';
import { Scheduler } from '@aldabil/react-scheduler';
import { CellRenderedProps } from '@aldabil/react-scheduler/dist/types';
import frLocale from 'date-fns/locale/fr';

import { useAppointmentPage } from './AppointmentPage.hooks';
import CreateNewAppointment from './CreateNewAppointment/CreateNewAppointment';
import { Button } from '@mui/material';

const AppointmentPage: FC<React.PropsWithChildren<unknown>> = () => {
  const {
    handleRemoteEvents,
    handleDeleteAppointment,
    isDeletingAppointment,
    appointments,
    isGetAppointmentsLoading,
  } = useAppointmentPage();

  return (
    <>
      <Scheduler
        loading={isGetAppointmentsLoading || isDeletingAppointment}
        events={appointments}
        locale={frLocale}
        dialogMaxWidth="lg"
        customEditor={(scheduler) => (
          <CreateNewAppointment scheduler={scheduler} />
        )}
        view="month"
        onDelete={handleDeleteAppointment}
        remoteEvents={handleRemoteEvents}
        month={{
          weekDays: [0, 1, 2, 3, 4, 5, 6],
          startHour: 8,
          endHour: 23,
          weekStartOn: 1,
          cellRenderer: ({ start, onClick }: CellRenderedProps) => {
            const today = new Date();

            today.setHours(0);
            today.setMinutes(0);
            today.setSeconds(0);

            const time = start.getTime();
            const disabled = time < today.getTime();

            return (
              <Button
                style={{
                  height: '100%',
                  background: disabled ? '#eee' : 'transparent',
                  cursor: disabled ? 'not-allowed' : 'pointer',
                }}
                onClick={() => {
                  if (disabled) {
                    return;
                  }
                  onClick();
                }}
                disableRipple={disabled}
              ></Button>
            );
          },
        }}
        week={{
          weekDays: [0, 1, 2, 3, 4, 5, 6],
          startHour: 8,
          endHour: 23,
          weekStartOn: 1,
          step: 60,
          cellRenderer: ({ start, onClick }: CellRenderedProps) => {
            const today = new Date();

            today.setHours(0);
            today.setMinutes(0);
            today.setSeconds(0);

            const time = start.getTime();
            const disabled = time < today.getTime();

            return (
              <Button
                style={{
                  height: '100%',
                  background: disabled ? '#eee' : 'transparent',
                  cursor: disabled ? 'not-allowed' : 'pointer',
                }}
                onClick={() => {
                  if (disabled) {
                    return;
                  }
                  onClick();
                }}
                disableRipple={disabled}
              ></Button>
            );
          },
        }}
        day={{
          startHour: 8,
          endHour: 23,
          step: 15,
          cellRenderer: ({ start, onClick }: CellRenderedProps) => {
            const today = new Date();

            const time = start.getTime();
            const disabled = time < today.getTime();

            return (
              <Button
                style={{
                  height: '100%',
                  background: disabled ? '#eee' : 'transparent',
                  cursor: disabled ? 'not-allowed' : 'pointer',
                }}
                onClick={() => {
                  if (disabled) {
                    return;
                  }
                  onClick();
                }}
                disableRipple={disabled}
              ></Button>
            );
          },
        }}
      />
    </>
  );
};

AppointmentPage.displayName = 'AppointmentPage';

export default AppointmentPage;
