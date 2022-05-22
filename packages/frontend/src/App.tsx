import { createTheme, ThemeProvider } from '@mui/material';
import React, { FunctionComponent } from 'react';
import { Route, Routes } from 'react-router-dom';

import AppointmentPage from './components/AppointmentPage/AppointmentPage';
import LoginPage from './components/LoginPage/LoginPage';
import PrivateRoute from './components/PrivateRoute';

const App: FunctionComponent = () => {
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <AppointmentPage />
            </PrivateRoute>
          }
        />
        <Route
          path="*"
          element={
            <PrivateRoute>
              <AppointmentPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </ThemeProvider>
  );
};

App.displayName = 'App';

export default App;
