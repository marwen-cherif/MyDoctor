import React, { FunctionComponent } from 'react';

import ThemeProvider from './components/theme';
import Router from './routes';

const App: FunctionComponent = () => {
  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  );
};

App.displayName = 'App';

export default App;
