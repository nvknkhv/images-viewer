import React, {
  FC,
  useEffect,
  Fragment,
  useMemo,
  useLayoutEffect,
  memo,
} from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { PhotoItem } from '~/model/Photo';
import Photo from './Photo';
import styles from './styles.module.css';
import { Spinner } from '@chakra-ui/react';

const GalleryVirtualizer: FC<{
  data: PhotoItem[];
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
  hasNextPage?: boolean;
  galleryId?: string;
  tags?: string[];
}> = ({
  data,
  fetchNextPage,
  isFetchingNextPage,
  hasNextPage,
  galleryId,
  tags,
}) => {
  const parentRef = React.useRef<HTMLDivElement>(null);
  const selectedListRef = React.useRef<HTMLDivElement>(null);

  const [width, setWidth] = React.useState(window.innerWidth);

  useLayoutEffect(() => {
    const handleChangeWidth = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleChangeWidth);

    return () => {
      window.removeEventListener('resize', handleChangeWidth);
    };
  });

  useLayoutEffect(() => {
    if (selectedListRef?.current) selectedListRef.current.scrollIntoView();
  }, [width]);

  const imageSize = useMemo(() => {
    if (width < 676) return 120;
    else if (width < 968) return 180;
    else if (width < 1118) return 220;
    else if (width < 1600) return 300;
    else return 450;
  }, [width]);

  const perPage = useMemo(() => {
    if (width < 530) return 2;
    else return 3;
  }, [width]);

  const rowVirtualizer = useVirtualizer({
    count: hasNextPage
      ? Math.ceil(data.length / perPage) + 1
      : Math.ceil(data.length / perPage),
    estimateSize: () => 1.1 * imageSize,
    getScrollElement: () => parentRef.current,
    overscan: 5,
  });

  const columnVirtualizer = useVirtualizer({
    horizontal: true,
    count: perPage,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 1.1 * imageSize,
    overscan: 0,
  });

  useEffect(() => {
    const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse();

    if (!lastItem) {
      return;
    }
    if (
      lastItem.index >= Math.ceil(data.length / perPage) - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    rowVirtualizer.getVirtualItems(),
    data.length,
  ]);

  return (
    <div className={styles.Gallery}>
      <div
        ref={parentRef}
        className="List"
        style={{
          height: '100%',
          width: '100%',
          overflow: 'auto',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div
          ref={selectedListRef}
          style={{
            height: rowVirtualizer.getTotalSize(),
            width: columnVirtualizer.getTotalSize(),
            position: 'relative',
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const isLoaderRow =
              virtualRow.index > Math.ceil(data.length / perPage) - 1;
            if (isLoaderRow)
              return (
                <Fragment key={virtualRow.key}>
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      transform: `translateX(0px) translateY(${virtualRow.start}px)`,
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      height: 'fit-content',
                    }}
                  >
                    {hasNextPage ? (
                      <Spinner
                        thickness="4px"
                        speed="0.65s"
                        emptyColor="gray.200"
                        color="blue.500"
                        size="xl"
                      />
                    ) : (
                      'Nothing more to load'
                    )}
                  </div>
                </Fragment>
              );
            return (
              <Fragment key={virtualRow.key}>
                {columnVirtualizer.getVirtualItems().map((virtualColumn) => {
                  const id = virtualRow.index * perPage + virtualColumn.index;
                  const photo = data[id];
                  return (
                    <div
                      ref={(el) => {
                        rowVirtualizer.measureElement(el);
                        columnVirtualizer.measureElement(el);
                      }}
                      key={virtualColumn.key}
                      data-index={id}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        transform: `translateX(${virtualColumn.start}px) translateY(${virtualRow.start}px)`,
                      }}
                    >
                      {photo && (
                        <Photo
                          photo={photo}
                          imageSize={imageSize}
                          activePhotoIndex={
                            virtualRow.index * perPage + virtualColumn.index
                          }
                          galleryId={galleryId}
                          tags={tags}
                        />
                      )}
                    </div>
                  );
                })}
              </Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default memo(GalleryVirtualizer);
