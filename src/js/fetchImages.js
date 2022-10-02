import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export async function getImageData(word, pageNumber) {
  let totalHitsCount = '';
  try {
    const response = await axios.get(
      `https://pixabay.com/api/?&pretty=true&page=${pageNumber}`,
      {
        params: {
          key: '22104578-b37830bb47769ec8fcc7503cc',
          image_type: 'photo',
          per_page: 40,
          q: word,
          orientation: 'horizontal',
          safesearch: true,
        },
      }
    );
    const linksArray = response.data.hits;
    totalHitsCount = response.data.totalHits;
    console.log("totalHitsCount",totalHitsCount);
    if (!linksArray.length) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    return {linksArray, totalHitsCount};
  } catch (error) {
    Notify.failure('ERROR:', error);
  }
}
