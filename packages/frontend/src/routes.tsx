import { Navigate, useRoutes } from 'react-router-dom';
import { DashboardLayout } from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
import NotFound from './components/pages/NotFoundPage';
import AuthenticationService from './services/authentication.service';
import LoginPage from './components/pages/LoginPage/LoginPage';
import AppointmentPage from './components/pages/AppointmentPage/AppointmentPage';

export const RoutesConfig = {
  Login: 'login',
  NotFound: '404',
  App: 'app',
  Appointment: 'appointment',
};

const Router = () => {
  const basicRoutes = [
    { path: RoutesConfig.Login, element: <LoginPage /> },
    { path: RoutesConfig.NotFound, element: <NotFound /> },
  ];

  const routes = AuthenticationService.isLoggedIn()
    ? [
        {
          path: RoutesConfig.App,
          element: <DashboardLayout />,
          children: [
            { path: RoutesConfig.Appointment, element: <AppointmentPage /> },
          ],
        },
        {
          path: '/',
          element: <LogoOnlyLayout />,
          children: [
            ...basicRoutes,
            {
              path: '/',
              element: (
                <Navigate
                  to={`/${RoutesConfig.App}/${RoutesConfig.Appointment}`}
                  replace
                />
              ),
            },
            {
              path: '*',
              element: <Navigate to={RoutesConfig.NotFound} replace />,
            },
          ],
        },
        { path: '*', element: <Navigate to={RoutesConfig.NotFound} replace /> },
      ]
    : [
        {
          path: '/',
          element: <LogoOnlyLayout />,
          children: [
            ...basicRoutes,
            {
              path: '*',
              element: <Navigate to={RoutesConfig.Login} replace />,
            },
          ],
        },
        { path: '*', element: <Navigate to={RoutesConfig.Login} replace /> },
      ];

  return useRoutes(routes);
};

export default Router;
