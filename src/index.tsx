import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import filtersStore from '~/stores/FiltersStore';
import galleriesStore from '~/stores/GalleriesStore';
import { Provider } from 'mobx-react';
import { ChakraProvider } from '@chakra-ui/react';

import './index.css';
import App from './App';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <Provider filters={filtersStore} galleries={galleriesStore}>
          <App />
        </Provider>
      </ChakraProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
