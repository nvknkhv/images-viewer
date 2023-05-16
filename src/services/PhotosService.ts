import { PhotoItem } from '~/model/Photo';

const API_KEY = '66926032bec6d9a80e87d60d3b572d75';

class PhotosService {
  getPhotos = async (
    galleryId: string,
    pageParam = '1'
  ): Promise<{
    entities: PhotoItem[];
    nextPage: string | undefined;
    total: number;
  }> => {
    const limit = 15;
    let nextPage;

    const photosResponse = await fetch(
      `https://www.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=${API_KEY}&gallery_id=${galleryId}&format=json&nojsoncallback=1&extras=original_format&per_page=${limit}&page=${pageParam}`
    );
    const { photos } = await photosResponse.json();
    const {
      photo,
      page,
      pages,
      total,
    }: {
      photo: PhotoItem[];
      page: string;
      pages: number;
      total: number;
    } = photos;

    if (Number(page) < pages) {
      nextPage = String(Number(page) + 1);
    }
    return {
      entities: photo,
      nextPage,
      total,
    };
  };

  searchPhotosByTags = async (
    tags: string,
    pageParam = '1'
  ): Promise<{
    entities: PhotoItem[];
    nextPage: string | undefined;
    total: number;
  }> => {
    const limit = 15;
    let nextPage;

    const photosResponse = await fetch(
      `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_KEY}&tags=${tags}&format=json&nojsoncallback=1&extras=original_format&per_page=${limit}&page=${pageParam}`
    );
    const { photos } = await photosResponse.json();
    const {
      photo,
      page,
      pages,
      total,
    }: {
      photo: PhotoItem[];
      page: string;
      pages: number;
      total: number;
    } = photos;

    if (Number(page) < pages) {
      nextPage = String(Number(page) + 1);
    }
    return {
      entities: photo,
      nextPage,
      total,
    };
  };
}

export default new PhotosService();
