import React, { FC, useRef } from 'react';
import CreatableSelect from 'react-select/creatable';
import { Button } from '@chakra-ui/react';
import { useFiltersStore } from '~/stores/FiltersStore';
import { observer } from 'mobx-react-lite';
import styles from './styles.module.css';

interface SelectOption {
  readonly value: string;
  readonly label: string;
}

const selectOptions: SelectOption[] = [
  { value: 'nature', label: 'nature' },
  { value: 'fox', label: 'fox' },
  { value: 'train', label: 'train' },
  { value: 'chess', label: 'chess' },
  { value: 'mountains', label: 'mountains' },
];

const Toolbar: FC = () => {
  const { tags, setTags } = useFiltersStore();
  const selectRef = useRef(null);

  const handleChangeTags = () => {
    if (selectRef?.current)
      setTags(
        // @ts-ignore
        selectRef.current.props.value.map(
          ({ value }: { value: string }) => value
        )
      );
  };

  return (
    <header className={styles.Toolbar}>
      <img
        src={require('~/assets/img/gallery.svg').default}
        alt="logo"
        className={styles.LogoIcon}
      />
      <CreatableSelect
        isMulti
        options={selectOptions}
        ref={selectRef}
        defaultValue={tags.map(({ value }: { value: string }) => value)}
        placeholder='Enter tags and press "Search"'
      />
      <Button colorScheme="messenger" onClick={handleChangeTags}>
        Search
      </Button>
    </header>
  );
};

export default observer(Toolbar);
