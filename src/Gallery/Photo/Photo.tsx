import React, { FC, memo, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { PhotoItem } from '~/model/Photo';
import styles from './styles.module.css';
import { useGlobalModal } from '~/components/globalModal';
import Preview from '../../Preview';
import styled from 'styled-components';

const PreviewOverlay = styled.div<{ imageSize: number }>`
  display: none;
  position: absolute;
  background-color: black;
  opacity: 0.4;
  z-index: 2;
  color: white;
  align-items: center;
  justify-content: center;
  padding: ${({ imageSize }) => 0.05 * imageSize};
  top: ${({ imageSize }) => 0.05 * imageSize + 'px'};
  left: ${({ imageSize }) => 0.05 * imageSize + 'px'};
  width: ${({ imageSize }) => imageSize + 'px'};
  height: ${({ imageSize }) => imageSize + 'px'};
`;

const Photo: FC<{
  photo: PhotoItem;
  activePhotoIndex: number;
  imageSize: number;
  galleryId?: string;
  tags?: string[];
}> = ({ photo, activePhotoIndex, imageSize, galleryId, tags }) => {
  const [isPreviewAvailable, setPreviewAvailable] = useState(false);
  const { setModal, resetModal } = useGlobalModal();
  return (
    <div
      className={styles.PhotoContainer}
      style={{
        width: imageSize,
        height: imageSize,
        padding: 0.05 * imageSize,
      }}
    >
      <LazyLoadImage
        key={photo.id}
        alt={photo.title}
        src={`https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`}
        placeholderSrc={require('./placeholder-image.png').default}
        width={imageSize}
        height={imageSize}
        className={styles.Photo}
        afterLoad={() => setPreviewAvailable(true)}
      />
      {isPreviewAvailable && (
        <PreviewOverlay
          imageSize={imageSize}
          className={styles.PreviewOverlay}
          onClick={() => {
            setModal(
              <Preview
                onClose={resetModal}
                activePhotoIndex={activePhotoIndex}
                galleryId={galleryId}
                tags={tags}
              />
            );
          }}
        >
          <span>Preview</span>
        </PreviewOverlay>
      )}
    </div>
  );
};

export default memo(Photo);
