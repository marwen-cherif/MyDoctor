import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { HelmetProvider } from 'react-helmet-async';

const container = document.getElementById('root');

const root = createRoot(container!);

function loadLocaleData(locale: string) {
  switch (locale) {
    case 'fr':
      return import('./compiled-messages/fr.json');
    default:
      return import('./compiled-messages/en.json');
  }
}

async function bootstrapApplication(locale: string) {
  const messages = await loadLocaleData(locale);

  root.render(
    <HelmetProvider>
      <BrowserRouter>
        <App locale={locale} messages={messages} />
      </BrowserRouter>
    </HelmetProvider>,
  );
}
bootstrapApplication('fr');

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
