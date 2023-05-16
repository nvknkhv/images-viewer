import { useInfiniteQuery } from '@tanstack/react-query';

import { PhotoItem } from '~/model/Photo';
import PhotosService from '~/services/PhotosService';

export const usePhotosByGallery = <TData = PhotoItem[], TError = unknown>(
  galleryId: string
) =>
  useInfiniteQuery(
    ['Photos', galleryId],
    (ctx) => PhotosService.getPhotos(galleryId, ctx.pageParam),
    {
      getNextPageParam: (lastPage) => lastPage.nextPage,
    }
  );

export const usePhotosByTags = <TData = PhotoItem[], TError = unknown>(
  tags: string[]
) =>
  useInfiniteQuery(
    ['Photos', tags],
    (ctx) => PhotosService.searchPhotosByTags(tags.join(','), ctx.pageParam),

    {
      getNextPageParam: (lastPage) => lastPage.nextPage,
    }
  );
