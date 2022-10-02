import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export function callLightbox() {
    let lightbox = new SimpleLightbox('.gallery a', {
      showCounter: true,
      captions: true,
      captionsData: 'alt',
      captionDelay: 250,
    });
  }