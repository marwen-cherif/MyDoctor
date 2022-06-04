import { date, object, string } from 'yup';

export const schema = object({
  startAt: date().required(),
  endAt: date().required(),
  search: object().nullable().required(),
  client: object({
    firstName: string().required(),
    lastName: string().required(),
    email: string().email(),
    phone: string().matches(/\d+/g).required(),
    phoneCountryPrefix: string().matches(/\+\d+/g).required(),
  }),
}).required();
