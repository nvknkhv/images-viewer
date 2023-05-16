import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';

import Toolbar from '~/components/Toolbar';
import GalleriesList from '~/components/GalleriesList';
import GalleryByTags from '~/Gallery/GalleryByTags';

import styles from './styles.module.css';
import { useFiltersStore } from '~/stores/FiltersStore';

const MainPageContent: FC = observer(() => {
  const { tags } = useFiltersStore();
  return tags.length === 0 ? <GalleriesList /> : <GalleryByTags tags={tags} />;
});

const MainPage: FC = () => {
  return (
    <div className={styles.Layout}>
      <Toolbar />
      <main className={styles.Content}>
        <MainPageContent />
      </main>
    </div>
  );
};

export default MainPage;
