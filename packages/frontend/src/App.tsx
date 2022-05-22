import React, { FunctionComponent } from 'react';

import ThemeProvider from './components/theme';
import Router from './routes';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const App: FunctionComponent = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Router />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

App.displayName = 'App';

export default App;
