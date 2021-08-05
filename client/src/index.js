import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import App from './App';

// Bootstap js
import 'bootstrap/dist/js/bootstrap.bundle.min';
// styles incl Bootstrap
import './scss/custom.scss';

const queryClient = new QueryClient();

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <App />
    <ReactQueryDevtools initialIsOpen />
  </QueryClientProvider>,
  document.getElementById('root')
);
