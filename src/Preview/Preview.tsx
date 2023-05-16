import React, { FC, useState, useEffect, useCallback, memo } from 'react';
import styles from './styles.module.css';
import PreviewHeader from './PreviewHeader';
import { IconButton } from '@chakra-ui/react';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { usePhotosByGallery, usePhotosByTags } from '~/queries/Photos';

const Preview: FC<{
  activePhotoIndex: number;
  onClose: () => void;
  galleryId?: string;
  tags?: string[];
}> = ({ onClose, activePhotoIndex, galleryId, tags = [] }) => {
  const [activeIndex, setActive] = useState(activePhotoIndex);

  const { data, fetchNextPage, hasNextPage } = galleryId
    ? usePhotosByGallery(galleryId)
    : usePhotosByTags(tags);
  const allPhotos = data?.pages ? data.pages.flatMap((d) => d.entities) : [];

  const disabledPrevBtn = activeIndex === 0;
  const disabledNextBtn = !hasNextPage && activeIndex === allPhotos.length - 1;

  const handelChangePreview = useCallback(
    (action: 'next' | 'prev') => {
      switch (action) {
        case 'next':
          if (!disabledNextBtn) {
            setActive(activeIndex + 1);
          }
          break;

        case 'prev':
          if (!disabledPrevBtn) {
            setActive(activeIndex - 1);
          }
          break;

        default:
          break;
      }
    },
    [disabledNextBtn, disabledPrevBtn, activeIndex, setActive]
  );

  const handleKeyPress = useCallback(
    ({ keyCode }: { keyCode: number }) => {
      switch (keyCode) {
        case 27:
          onClose();
          break;

        case 37:
          handelChangePreview('prev');
          break;

        case 39:
          handelChangePreview('next');
          break;

        default:
          break;
      }
    },
    [handelChangePreview, onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  useEffect(() => {
    if (
      activeIndex % 15 === 0 &&
      activeIndex >= allPhotos.length - 1 &&
      hasNextPage
    ) {
      fetchNextPage();
    }
  }, [hasNextPage, fetchNextPage, activeIndex, allPhotos.length]);

  return (
    <div className={styles.Preview}>
      <PreviewHeader
        onClose={onClose}
        title={allPhotos[activeIndex]?.title || ''}
      />
      <div className={styles.Content}>
        <div
          className={styles.NavButton}
          onClick={() => handelChangePreview('prev')}
        >
          {!disabledPrevBtn && (
            <IconButton
              colorScheme="darkgray"
              aria-label="Call Sage"
              fontSize="24px"
              icon={<FaArrowLeft />}
              onClick={() => {
                handelChangePreview('prev');
              }}
            />
          )}
        </div>
        <div className={styles.Overlay} />
        <div className={styles.Background} onClick={onClose}>
          <div className={styles.PreviewContainer}>
            {allPhotos[activeIndex] && (
              <img
                src={`https://live.staticflickr.com/${allPhotos[activeIndex].server}/${allPhotos[activeIndex].id}_${allPhotos[activeIndex].secret}_b.jpg`}
              />
            )}
          </div>
        </div>
        <div
          className={styles.NavButton}
          onClick={() => handelChangePreview('next')}
        >
          {!disabledNextBtn && (
            <IconButton
              colorScheme="darkgray"
              aria-label="Call Sage"
              fontSize="24px"
              icon={<FaArrowRight />}
              onClick={() => {
                handelChangePreview('next');
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(Preview);
