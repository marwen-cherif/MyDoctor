import * as yup from 'yup';

export const schema = yup
  .object({
    startAt: yup.date().required(),
    endAt: yup.date().required(),
    clientEmail: yup.string().required(),
  })
  .required();
