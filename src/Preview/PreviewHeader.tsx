import React, { FC } from 'react';
import { Heading, IconButton } from '@chakra-ui/react';
import { FaWindowClose } from 'react-icons/fa';
import styles from './styles.module.css';

const PreviewHeader: FC<{ onClose: () => void; title: string }> = ({
  onClose,
  title,
}) => {
  return (
    <div className={styles.Header}>
      <div className={styles.Info}>
        <Heading
          fontSize="xl"
          className={styles.Name}
          noOfLines={1}
          color="white"
        >
          {title}
        </Heading>
      </div>
      <div className={styles.Actions}>
        <IconButton
          aria-label="close"
          colorScheme="darkgray"
          fontSize="32px"
          icon={<FaWindowClose />}
          onClick={onClose}
        />
      </div>
    </div>
  );
};

export default PreviewHeader;
