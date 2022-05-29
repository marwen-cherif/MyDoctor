import { FC } from 'react';
import { SchedulerHelpers } from '@aldabil/react-scheduler/dist/types';
import { Button, DialogActions, TextField, Typography } from '@mui/material';
import { useCreateNewAppointment } from './CreateNewAppointment.hooks';
import { CreateNewAppointmentForm } from './CreateNewAppointment.types';
import { propertyOf } from '../../../../helpers';
import { DateTimePicker } from '@mui/x-date-pickers';
import { Controller } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';

interface CreateNewAppointmentProps {
  scheduler: SchedulerHelpers;
}

const CreateNewAppointment: FC<
  React.PropsWithChildren<CreateNewAppointmentProps>
> = ({ scheduler }) => {
  const { formContext, handleCreateNewAppointment } = useCreateNewAppointment({
    scheduler,
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = formContext;

  return (
    <form onSubmit={handleSubmit(handleCreateNewAppointment)}>
      <div style={{ padding: '1rem' }}>
        <Typography component="div" variant="subtitle1" gutterBottom>
          <FormattedMessage
            id="CreateNewAppointment.title"
            defaultMessage="Create a new appointment"
          />
        </Typography>
        <TextField
          label="Client email"
          error={Boolean(errors.clientEmail)}
          helperText={
            errors.clientEmail ? errors.clientEmail.message : undefined
          }
          fullWidth
          {...register(propertyOf<CreateNewAppointmentForm>('clientEmail'))}
          inputRef={(input) => input?.focus()}
        />
      </div>
      <div style={{ padding: '1rem' }}>
        <Controller
          control={control}
          name={propertyOf<CreateNewAppointmentForm>('startAt')}
          render={({ field: { onChange, value } }) => {
            return (
              <DateTimePicker
                label="Start At"
                value={value}
                onChange={onChange}
                renderInput={(props) => <TextField {...props} />}
              />
            );
          }}
        />
      </div>
      <div style={{ padding: '1rem' }}>
        <Controller
          control={control}
          name={propertyOf<CreateNewAppointmentForm>('endAt')}
          render={({ field: { onChange, value } }) => {
            return (
              <DateTimePicker
                label="End At"
                value={value}
                onChange={onChange}
                renderInput={(props) => <TextField {...props} />}
              />
            );
          }}
        />
      </div>

      <DialogActions>
        <Button onClick={scheduler.close}>
          <FormattedMessage id="General.cancelButton" defaultMessage="Cancel" />
        </Button>
        <Button variant="contained" type="submit">
          <FormattedMessage
            id="General.confirmButton"
            defaultMessage="Confirm"
          />
        </Button>
      </DialogActions>
    </form>
  );
};

export default CreateNewAppointment;
