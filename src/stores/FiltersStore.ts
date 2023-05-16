import { useContext } from 'react';
import { makeAutoObservable, observable, action } from 'mobx';
import { MobXProviderContext } from 'mobx-react';

class FiltersStore {
  tags: string[] = [];

  constructor() {
    makeAutoObservable(this, {
      tags: observable,
      setTags: action,
    });
  }

  setTags = (value: string[]) => {
    this.tags = value;
  };
}

export default new FiltersStore();

export const useFiltersStore = () => {
  const { filters } = useContext(MobXProviderContext);
  return filters;
};
