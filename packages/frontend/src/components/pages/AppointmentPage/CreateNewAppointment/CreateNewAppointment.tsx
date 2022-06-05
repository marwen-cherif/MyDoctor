import { FC, useState, useCallback } from 'react';
import { SchedulerHelpers } from '@aldabil/react-scheduler/dist/types';
import {
  Button,
  DialogActions,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { UserDto, isFailureResponse } from '@mydoctor/common';
import { DateTimePicker } from '@mui/x-date-pickers';
import { Controller, FormProvider, useWatch } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { useQuery } from 'react-query';

import { Autocomplete } from '../../../atoms/Autocomplete';

import { useCreateNewAppointment } from './CreateNewAppointment.hooks';
import { CreateNewAppointmentForm, Option } from './CreateNewAppointment.types';
import { propertyOf } from '../../../../helpers';
import UserService from '../../../../services/UserService';
import { UpsertCustomerForm } from './UpsertCustomerForm';

interface CreateNewAppointmentProps {
  scheduler: SchedulerHelpers;
}

const NEW_CUSTOMER = 'NEW_CUSTOMER';

const CreateNewAppointment: FC<
  React.PropsWithChildren<CreateNewAppointmentProps>
> = ({ scheduler }) => {
  const intl = useIntl();
  const { formContext, handleCreateNewAppointment } = useCreateNewAppointment({
    scheduler,
  });
  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    resetField,
  } = formContext;
  const search = useWatch({
    control,
    name: 'search',
  });
  const [query, setQuery] = useState<string | undefined>();

  const { data: clientOptions, isLoading: isSearchClientLoading } = useQuery(
    ['searchClient', { query }],
    async (): Promise<Option<UserDto | undefined>[]> => {
      if (query) {
        const response = await UserService.searchClient({
          searchTerm: query,
        });

        if (isFailureResponse(response.data)) {
          return [];
        }

        return [
          ...(response.data || []).map((client) => ({
            value: client.id,
            label: `${client.lastName} ${client.firstName} <${client.phone}>`,
            data: client,
          })),
          {
            value: NEW_CUSTOMER,
            label: intl.formatMessage({
              defaultMessage: 'New Customer',
            }),
          },
        ];
      }

      return [];
    },
    { retryDelay: 360000 },
  );

  const handleInputChange = useCallback(
    (newValue?: string) => {
      setQuery(newValue);
    },
    [setQuery],
  );

  return (
    <FormProvider {...formContext}>
      <form onSubmit={handleSubmit(handleCreateNewAppointment)}>
        <div style={{ padding: '1rem' }}>
          <Typography component="div" variant="subtitle1" gutterBottom>
            <FormattedMessage defaultMessage="Create a new appointment" />
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Controller
                control={control}
                name="search"
                render={({ field: { onChange, value, name } }) => {
                  return (
                    <Autocomplete
                      label={intl.formatMessage({
                        defaultMessage: 'Search Customer',
                      })}
                      name={name}
                      errors={errors}
                      options={clientOptions || []}
                      isLoading={isSearchClientLoading}
                      value={value}
                      onChange={(newValue) => {
                        if (newValue && newValue.data) {
                          setValue('client', newValue.data);
                        } else {
                          resetField('client');
                        }

                        onChange(newValue);
                      }}
                      onInputChange={handleInputChange}
                    />
                  );
                }}
              />
            </Grid>
            <Grid item sm={6} />

            {search && <UpsertCustomerForm />}

            <Grid item xs={12} sm={6}>
              <Controller
                control={control}
                name={propertyOf<CreateNewAppointmentForm>('startAt')}
                render={({ field: { onChange, value } }) => {
                  return (
                    <DateTimePicker
                      label="Start At"
                      value={value}
                      onChange={onChange}
                      renderInput={(props) => (
                        <TextField {...props} fullWidth />
                      )}
                    />
                  );
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                control={control}
                name={propertyOf<CreateNewAppointmentForm>('endAt')}
                render={({ field: { onChange, value } }) => {
                  return (
                    <DateTimePicker
                      label="End At"
                      value={value}
                      onChange={onChange}
                      renderInput={(props) => (
                        <TextField {...props} fullWidth />
                      )}
                    />
                  );
                }}
              />
            </Grid>
          </Grid>
        </div>

        <DialogActions>
          <Button onClick={scheduler.close}>
            <FormattedMessage defaultMessage="Cancel" />
          </Button>
          <Button variant="contained" type="submit">
            <FormattedMessage defaultMessage="Confirm" />
          </Button>
        </DialogActions>
      </form>
    </FormProvider>
  );
};

export default CreateNewAppointment;
