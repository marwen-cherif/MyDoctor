import React, { useEffect, useState } from 'react';
import { BaseOption } from '../../pages/AppointmentPage/CreateNewAppointment/CreateNewAppointment.types';
import {
  Autocomplete as MaterialAutocomplete,
  CircularProgress,
  TextField,
} from '@mui/material';
import { useDebounce } from '../../../hooks/useDebounce';
import { FieldErrors } from 'react-hook-form/dist/types/errors';

function Autocomplete<T extends BaseOption>({
  options = [],
  isLoading = false,
  value,
  onChange,
  label,
  name,
  errors,
  onInputChange,
  focusOnMount = false,
}: {
  label: string;
  name: string;
  errors: FieldErrors;
  options?: T[];
  isLoading?: boolean;
  focusOnMount?: boolean;
  value?: T;
  onChange: (newValue?: T) => void;
  onInputChange: (newValue?: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useDebounce<string | undefined>(value?.value);

  useEffect(() => {
    onInputChange(query);
  }, [onInputChange, query]);

  return (
    <MaterialAutocomplete
      sx={{ width: '100%' }}
      open={open}
      filterOptions={(x) => x}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      isOptionEqualToValue={(option, value) => {
        return option.value === value.value;
      }}
      getOptionLabel={(option) => {
        return option.label;
      }}
      options={options}
      loading={isLoading}
      inputValue={value?.value}
      value={value}
      onChange={(e, newValue) => {
        onChange(options.find((option) => option.value === newValue?.value));
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          error={Boolean(errors[name])}
          inputRef={focusOnMount ? (input) => input?.focus() : undefined}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {isLoading ? <CircularProgress size={20} /> : undefined}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
}

Autocomplete.displayName = 'Autocompelte';

export default Autocomplete;
