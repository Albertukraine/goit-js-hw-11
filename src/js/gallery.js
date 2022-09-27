
 import SimpleLightbox from 'simplelightbox';
 import 'simplelightbox/dist/simple-lightbox.min.css';
 import { Notify } from 'notiflix/build/notiflix-notify-aio';
 import debounce from 'lodash.debounce';
 import axios from 'axios';
 
 const refs = {
   formEl: document.querySelector(".search-form"),
   searchBtnEl: document.querySelector(".submit-btn"),
   galleryEl: document.querySelector('.gallery'),
   inputEl: document.querySelector('input'),
  }

async function getImage(word, pageNumber) {
  try {
    const response = await axios.get(`https://pixabay.com/api/?key=22104578-b37830bb47769ec8fcc7503cc&q=${word}&image_type=photo&pretty=true&page=${pageNumber}&per_page=40`);
    // console.log(response.data.hits);
    const linksArray = response.data.hits;
    return linksArray;
  } catch (error) {
    console.error(error);
  }
}

 function renderHTML(array) {const imagesMarkup = array.map(image => 
  {return ` <li><a class = "gallery__item" href = "${image.largeImageURL}">
  <img class = "gallery__image" alt = "${image.tags}" src = "${image.previewURL}"></a></li>`}
 ); 
 refs.galleryEl.insertAdjacentHTML('afterbegin',imagesMarkup.join(''));
  //  console.log(imagesMarkup);

 };



// getImage('cat', 1).then(linksArray => {renderHTML(linksArray)});
getImage('cat', 2).then(linksArray => console.log(linksArray));
// getImage('cat', 3).then(linksArray => console.log(linksArray));



  
refs.formEl.addEventListener('submit', onSubmit);

let queryWord = "";

function onSubmit(event) { 
  event.preventDefault();
  queryWord = refs.inputEl.value;
  console.log(refs.inputEl.value);
  getImage(queryWord, 1).then(linksArray => {renderHTML(linksArray)});
  
  };

function getWord(evt) {
  let normalizedWord = evt.target.value.trim();
  console.log(normalizedWord);
  // return normalizedWord;
}



// const galleryTabsContainer = galleryItems.map(image => {
//   return ` <li><a class = "gallery__item" href = "${image.original}">
// <img class = "gallery__image" alt = "${image.description}" src = "${image.preview}"></a></li>`;
// });

// galleryEl.insertAdjacentHTML('afterbegin', galleryTabsContainer.join(''));

// // console.log(galleryEl);


// let lightbox = new SimpleLightbox('.gallery a', {
//   showCounter: true,
//   captions: true,
//   captionsData: 'alt',
//   captionDelay: 250,
// });

// key 22104578-b37830bb47769ec8fcc7503cc
