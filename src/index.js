import { renderHTML } from './js/renderHTML';
import { getImageData } from './js/fetchImages';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { clearHTML } from './js/clearMarkup';
import { getWord } from './js/getWord';
import { hideButton } from './js/btnHideShow';
import { showButton } from './js/btnHideShow';
import { callLightbox } from './js/callLightBox';

const refs = {
  formEl: document.querySelector('.search-form'),
  searchBtnEl: document.querySelector('.submit-btn'),
  galleryEl: document.querySelector('.gallery'),
  inputEl: document.querySelector('input'),
  loadMoreBtnEl: document.querySelector('.load-more-btn'),
};

let pageNumber = 1;


refs.inputEl.addEventListener('input', () => clearHTML(refs, hideButton));
refs.formEl.addEventListener('submit', onSubmit);
refs.loadMoreBtnEl.addEventListener('click', onLoadMore);

async function onLoadMore() {
  pageNumber += 1;
  const linksArray = await getImageData(getWord(refs), pageNumber);
  if (linksArray.length < 40) {
    hideButton(refs);
    Notify.info("We're sorry, but you've reached the end of search results.");
  }
  renderHTML(linksArray, refs);
  callLightbox();
}

async function onSubmit(event) {
  event.preventDefault();
  getWord(refs);
  const {linksArray, totalHitsCount} = await getImageData(getWord(refs), pageNumber);
  if (linksArray.length) {Notify.info(`Hooray! We found ${totalHitsCount} images.`)};
  console.log(totalHitsCount);
  renderHTML(linksArray, refs);
  callLightbox();
  pageNumber = 1;
  if (linksArray.length > 39) {
    showButton(refs);
  }
}
