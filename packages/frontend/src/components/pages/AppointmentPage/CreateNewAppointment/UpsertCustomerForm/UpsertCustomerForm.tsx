import React, { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { Grid, TextField } from '@mui/material';
import { CreateNewAppointmentForm } from '../CreateNewAppointment.types';
import { useIntl } from 'react-intl';

const UpsertCustomerForm: FC = () => {
  const intl = useIntl();
  const formContext = useFormContext<CreateNewAppointmentForm>();
  const {
    register,
    formState: { errors },
  } = formContext;

  return (
    <>
      <Grid item xs={12} sm={3}>
        <TextField
          label={intl.formatMessage({
            id: 'general.firstName',
            defaultMessage: 'First name',
          })}
          error={Boolean(errors.client?.firstName)}
          helperText={
            errors.client?.firstName
              ? errors.client?.firstName.message
              : undefined
          }
          fullWidth
          {...register('client.firstName')}
          inputRef={(input) => input?.focus()}
          required
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <TextField
          label={intl.formatMessage({
            id: 'general.lastName',
            defaultMessage: 'Last name',
          })}
          error={Boolean(errors.client?.lastName)}
          helperText={
            errors.client?.lastName
              ? errors.client?.lastName.message
              : undefined
          }
          fullWidth
          {...register('client.lastName')}
          required
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          label={intl.formatMessage({
            id: 'general.email',
            defaultMessage: 'Email',
          })}
          error={Boolean(errors.client?.email)}
          helperText={
            errors.client?.email ? errors.client?.email.message : undefined
          }
          fullWidth
          {...register('client.email')}
          type="email"
        />
      </Grid>

      <Grid item xs={12} sm={2}>
        <TextField
          label={intl.formatMessage({
            id: 'general.phoneCountryPrefix',
            defaultMessage: 'Country prefix',
          })}
          error={Boolean(errors.client?.phoneCountryPrefix)}
          helperText={
            errors.client?.phoneCountryPrefix
              ? errors.client?.phoneCountryPrefix.message
              : undefined
          }
          fullWidth
          {...register('client.phoneCountryPrefix')}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          label={intl.formatMessage({
            id: 'general.phone',
            defaultMessage: 'Phone',
          })}
          error={Boolean(errors.client?.phone)}
          helperText={
            errors.client?.phone ? errors.client?.phone.message : undefined
          }
          fullWidth
          {...register('client.phone')}
        />
      </Grid>

      <Grid item xs={12} sm={6} />
    </>
  );
};

UpsertCustomerForm.displayName = 'UpsertCustomerForm';

export default UpsertCustomerForm;
