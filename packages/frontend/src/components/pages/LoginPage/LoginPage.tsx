import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
  Avatar,
  Box,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  TextField,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { FunctionComponent } from 'react';

import { useLoginPage } from './LoginPage.hooks';

const LoginPage: FunctionComponent = () => {
  const { formContext, handleLogin } = useLoginPage();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = formContext;

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(handleLogin)}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            id="email"
            label="Email Address"
            autoComplete="email"
            autoFocus
            {...register('email')}
            error={Boolean(errors.email)}
            helperText={errors.email ? errors.email.message : undefined}
            required
            fullWidth
          />
          <TextField
            margin="normal"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            {...register('password')}
            error={Boolean(errors.password)}
            helperText={errors.password ? errors.password.message : undefined}
            required
            fullWidth
          />
          <FormControlLabel
            control={<Checkbox value={true} {...register('rememberMe')} />}
            label="Remember me"
          />

          <LoadingButton
            type="submit"
            loading={isSubmitting}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </LoadingButton>

          {/*<Grid container>*/}
          {/*  <Grid item xs>*/}
          {/*    <Link href="src/pages/LoginPage/LoginPage#" variant="body2">*/}
          {/*      Forgot password?*/}
          {/*    </Link>*/}
          {/*  </Grid>*/}
          {/*  <Grid item>*/}
          {/*    <Link href="src/pages/LoginPage/LoginPage#" variant="body2">*/}
          {/*      {"Don't have an account? Sign Up"}*/}
          {/*    </Link>*/}
          {/*  </Grid>*/}
          {/*</Grid>*/}
        </Box>
      </Box>
    </Container>
  );
};

LoginPage.displayName = 'LoginPage';

export default LoginPage;
