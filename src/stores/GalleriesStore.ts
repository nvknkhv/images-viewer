import { useContext } from 'react';
import { makeAutoObservable, observable } from 'mobx';
import { MobXProviderContext } from 'mobx-react';
import { GalleryInfo } from '~/model/Gallery';

class GalleriesStore {
  galleries: GalleryInfo[] = [
    {
      id: '72157719532472701',
      name: 'Photogenic animals',
      count: 116,
      views: '6,7K',
      comments: 66,
      description:
        'Do you have a photo of a camera-ready animal? Join the discussion here!',
      imgSrc:
        'https://live.staticflickr.com/65535/51225448554_25e56043a5_z.jpg',
    },
    {
      id: '72157719972297558',
      name: 'Geometric Photography',
      count: 82,
      views: '4.1K',
      comments: 58,
      description:
        'Lines, shadows, nature, patterns – Flickr members recommend looking for and highlighting these elements when creating geometric photography. Read their suggestions and share your own tips with the community.',
      imgSrc: 'https://live.staticflickr.com/338/18598296829_3111358ee6_z.jpg',
    },
    {
      id: '72157719421354859',
      name: 'Magnificent Trees',
      count: 191,
      views: '5.4K',
      comments: 100,
      description: 'Do you have a story of a magnificent tree? View here.',
      imgSrc: 'https://live.staticflickr.com/533/31799689084_b4817a898f_z.jpg',
    },
    {
      id: '72157719354784897',
      name: 'Bokeh',
      count: 65,
      views: '4.1K',
      comments: 34,
      description:
        'Celebrate the beauty of the blur. Share what you think makes a great bokeh shot here.',
      imgSrc: 'https://live.staticflickr.com/3913/15173207379_2d1dc6b64e_z.jpg',
    },
    {
      id: '72157719122515252',
      name: 'Trains',
      count: 97,
      views: '4.8K',
      comments: 26,
      description:
        "With National Train Day around the corner, we invite you to explore the Flickr community's train photography. If you'd like to join the discussion with fellow train photographers, start here.",
      imgSrc:
        'https://live.staticflickr.com/65535/45046691652_4ca177b7bb_z.jpg',
    },
  ];

  constructor() {
    makeAutoObservable(this, {
      galleries: observable,
    });
  }
}

export default new GalleriesStore();

export const useGalleriesStore = () => {
  const { galleries } = useContext(MobXProviderContext);
  return galleries;
};
