// Add imports above this line
// import { galleryItems } from './gallery-items';
// // Change code below this line
// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';
// console.log(galleryItems);

const galleryEl = document.querySelector('.gallery');

const galleryTabsContainer = galleryItems.map(image => {
  return ` <li><a class = "gallery__item" href = "${image.original}">
<img class = "gallery__image" alt = "${image.description}" src = "${image.preview}"></a></li>`;
});

galleryEl.insertAdjacentHTML('afterbegin', galleryTabsContainer.join(''));

// console.log(galleryEl);

let lightbox = new SimpleLightbox('.gallery a', {
  showCounter: true,
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});
