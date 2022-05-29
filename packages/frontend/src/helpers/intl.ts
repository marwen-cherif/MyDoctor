import { createIntl, createIntlCache } from 'react-intl';

const cache = createIntlCache();

export const intl = createIntl(
  {
    locale: 'fr-FR',
    messages: {},
  },
  cache,
);
