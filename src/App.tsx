import React, { useEffect, useState, createContext, useContext } from 'react';
import { createHashRouter, RouterProvider } from 'react-router-dom';

import { GlobalModal, GlobalModalProvider } from '~/components/globalModal';

import routes from './routes';

const router = createHashRouter(routes);

function App() {
  return (
    <GlobalModalProvider>
      <RouterProvider router={router} />
      <GlobalModal />
    </GlobalModalProvider>
  );
}

export default App;
