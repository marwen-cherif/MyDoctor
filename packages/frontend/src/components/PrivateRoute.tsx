import { FunctionComponent } from 'react';
import { Navigate } from 'react-router-dom';

import AuthenticationService from '../services/authentication.service';

const PrivateRoute: FunctionComponent<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  if (AuthenticationService.isLoggedIn()) {
    return <>{children}</>;
  }

  return <Navigate to={'/login'} />;
};

PrivateRoute.displayName = 'PrivateRoute';

export default PrivateRoute;
