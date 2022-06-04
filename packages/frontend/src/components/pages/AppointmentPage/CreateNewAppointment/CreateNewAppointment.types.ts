import { UserDto } from '@mydoctor/common/dto';

export interface BaseOption {
  value: string;
  label: string;
}

export interface Option<T = undefined> extends BaseOption {
  data?: T;
}

export interface CreateNewAppointmentForm {
  startAt: Date;
  endAt: Date;
  search: Option<UserDto | undefined>;
  client: {
    email?: string;
    lastName: string;
    firstName: string;
    phone: string;
    phoneCountryPrefix: string;
  };
}
