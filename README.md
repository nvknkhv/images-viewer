# Images Viewer
Приложение для просмотра фотографий с использованием Flickr API.
Отображает список фотографий для конкретной галереи или по заданным тегам. Позволяет пользователю выбирать фотографию для просмотра в большем размере.

## Description
- Lazy loading изображений
- Infinite scroll галереи фотографий
- Виртуализация только видимых узлов в DOM при скролле большого количества элементов

## How to start
Github page - https://nvknkhv.github.io/images-viewer/

Или
```sh
clone repository
npm i
npm start
open localhost:9000
```
## What used
- React 18, React router v6
- Typescript
- Webpack
- SCSS and styled components
- ```@tanstack/react-virtual``` - библиотека для виртуализации
- ```react-lazy-load-image-component``` - библиотека для ленивой подгрузки изображений
- ```chakra-ui``` - библиотека компонентов

## Notes
 - Данный на первой странице являются заглушкой. Черех API получается список фотографий при поиске по тегам и для конкретной галереи.

















