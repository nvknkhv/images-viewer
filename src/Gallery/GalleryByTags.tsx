import React, { FC } from 'react';
import { usePhotosByTags } from '~/queries/Photos';
import GalleryVirtualizer from './GalleryVirtualizer';
import { Spinner, Text, Flex } from '@chakra-ui/react';
import styles from './styles.module.css';

const GalleryByTags: FC<{ tags: string[] }> = ({ tags }) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    usePhotosByTags(tags);
  const allPhotos = data?.pages ? data.pages.flatMap((d) => d.entities) : [];
  const total = data?.pages ? data.pages.flatMap((d) => d.total)[0] : 0;
  if (!allPhotos) return null;

  if (status === 'loading') {
    return (
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    );
  }

  if (allPhotos.length === 0) return <span>no data</span>;

  return (
    <Flex direction="column" className={styles.GalleryVirtualizerWrapper}>
      <Text>Total: {total}</Text>
      <GalleryVirtualizer
        data={allPhotos}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
        isFetchingNextPage={isFetchingNextPage}
        tags={tags}
      />
    </Flex>
  );
};

export default GalleryByTags;
