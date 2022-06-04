import React, { FunctionComponent } from 'react';

import createGenericContext from '../../helpers/createGenericContext';
import { User } from '../../types/User';

export interface CurrentUserContextArgs {
  user: User;
}

const [useCurrentUserContext, CurrentUserProvider] =
  createGenericContext<CurrentUserContextArgs>();

const CurrentUserContextProvider: FunctionComponent<
  React.PropsWithChildren<{ user: User }>
> = ({ children, user }) => {
  return <CurrentUserProvider value={{ user }}>{children}</CurrentUserProvider>;
};

CurrentUserContextProvider.displayName = 'CurrentUserContextProvider';

export { CurrentUserContextProvider, useCurrentUserContext };
