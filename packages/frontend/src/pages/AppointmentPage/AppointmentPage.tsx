import { FC } from 'react';
import { Scheduler } from '@aldabil/react-scheduler';
import { FieldProps } from '@aldabil/react-scheduler/dist/types';
import { useAppointmentPage } from './AppointmentPage.hooks';

const AppointmentPage: FC<React.PropsWithChildren<unknown>> = () => {
  const fields: FieldProps[] = [
    // {
    //   // name: string;
    //   // type: InputTypes;
    //   // /** Required for type="select" */
    //   // options?: Array<SelectOption>;
    //   // default?: string | number | Date | any;
    //   // config?: FieldInputProps;
    // },
  ];

  const { onRemoteEvents } = useAppointmentPage();

  return (
    <>
      <Scheduler view="month" fields={fields} remoteEvents={onRemoteEvents} />
    </>
  );
};

AppointmentPage.displayName = 'AppointmentPage';

export default AppointmentPage;
