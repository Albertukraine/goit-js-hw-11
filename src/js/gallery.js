import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';

const refs = {
  formEl: document.querySelector('.search-form'),
  searchBtnEl: document.querySelector('.submit-btn'),
  galleryEl: document.querySelector('.gallery'),
  inputEl: document.querySelector('input'),
};

let queryWord = '';
let pageNumber = 1;

async function getImage(word, pageNumber) {
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

        }
      }
  
      );
    // console.log(response.data.hits);
    const linksArray = response.data.hits;
    return linksArray;
  } catch (error) {
    console.error(error);
  }
}


function renderHTML(array) {
  const imagesMarkup = array.map(image => {
    return ` <div class="photo-card">
    <a href="${image.largeImageURL}"><img src="${image.webformatURL}" alt = "${image.tags}" loading="lazy" /></a>
    <div class="info">
      <p class="info-item">
        <b>Likes</b>
        ${image.likes}
      </p>
      <p class="info-item">
        <b>Views</b>
        ${image.views}
      </p>
      <p class="info-item">
      <b>Comments</b>
      ${image.comments}
      </p>
      <p class="info-item">
        <b>Downloads</b>
        ${image.downloads}
      </p>
    </div>
  </div>`;
  });
  refs.galleryEl.insertAdjacentHTML('afterbegin', imagesMarkup.join(''));
  callLightbox();
  //  console.log(imagesMarkup);
}

async function onSubmit(event) {
  event.preventDefault();
  getWord();
  const linksArray = await getImage(queryWord, pageNumber);
  renderHTML(linksArray);
  }


function getWord(evt) {
  queryWord = refs.inputEl.value.trim();
  console.log(refs.inputEl.value);
  // return normalizedWord;
}

function callLightbox() {
  let lightbox = new SimpleLightbox('.gallery a', {
    showCounter: true,
    captions: true,
    captionsData: 'alt',
    captionDelay: 250,
  }); 
}

function clearHTML () {
  refs.galleryEl.innerHTML = ' '
}



function addMoreButton() {};

refs.inputEl.addEventListener('input', clearHTML);
refs.formEl.addEventListener('submit', onSubmit);


