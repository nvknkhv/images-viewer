import React, { FC } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button, Heading, Flex } from '@chakra-ui/react';
import GalleryById from '~/Gallery/GalleryById';
import { useGalleriesStore } from '~/stores/GalleriesStore';
import { observer } from 'mobx-react-lite';

import styles from './styles.module.css';

const GalleryPage: FC = () => {
  const { galleryId } = useParams();
  const { galleries } = useGalleriesStore();
  const currentGallery = galleries.find(
    ({ id }: { id: string }) => id === galleryId
  );
  return (
    <div className={styles.Layout}>
      <header className={styles.GalleryPageHeader}>
        <img
          src={require('~/assets/img/gallery.svg').default}
          alt="logo"
          className={styles.LogoIcon}
        />
        <Flex direction="column" gap="8px">
          <Link to="/">
            <Button colorScheme="messenger" size="sm">
              Back to galleries
            </Button>
          </Link>
          <Heading fontSize="xl">{currentGallery.name}</Heading>
        </Flex>
      </header>
      <main className={styles.Content}>
        {galleryId && currentGallery && <GalleryById galleryId={galleryId} />}
      </main>
    </div>
  );
};

export default observer(GalleryPage);
