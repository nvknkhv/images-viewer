import React from 'react';
import MainPage from '~/pages/MainPage';
import GalleryPage from '~/pages/GalleryPage';

const router = [
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: 'galleries/:galleryId',
    element: <GalleryPage />,
  },
];

export default router;
