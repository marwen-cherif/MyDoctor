import React, { FC } from 'react';
import frLocale from 'date-fns/locale/fr';

import ThemeProvider from './theme';
import Router from './routes';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { ReactQueryDevtools } from 'react-query/devtools';
import { IntlProvider } from 'react-intl';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const App: FC<{
  locale: string;
  messages: Record<string, any>;
}> = ({ locale, messages }) => {
  return (
    <IntlProvider messages={messages} locale={locale} defaultLocale="en">
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <LocalizationProvider
          dateAdapter={AdapterDateFns}
          adapterLocale={frLocale}
        >
          <ThemeProvider>
            <Router />
          </ThemeProvider>
        </LocalizationProvider>
      </QueryClientProvider>
    </IntlProvider>
  );
};

App.displayName = 'App';

export default App;
