import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import AuthenticationService from '../../../services/authentication.service';

import { schema } from './LoginPage.schema';
import { LoginFormValues } from './LoginPage.types';

export const useLoginPage = () => {
  const formContext = useForm<LoginFormValues>({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const handleLogin = useCallback(
    async (data: LoginFormValues) => {
      await AuthenticationService.login({
        email: data.email,
        password: data.password,
        rememberMe: Boolean(data.rememberMe),
      });

      navigate('/');
    },
    [navigate],
  );

  return {
    formContext,
    handleLogin,
  };
};
