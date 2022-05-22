import * as yup from 'yup';

export const schema = yup
  .object({
    email: yup.string().required(),
    password: yup.string().required(),
    rememberMe: yup.boolean(),
  })
  .required();
