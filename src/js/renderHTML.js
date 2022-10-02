export function renderHTML(array, refsObj) {
    if (array, refsObj) {
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
        refsObj.galleryEl.insertAdjacentHTML('beforeend', imagesMarkup.join(''));
        refsObj.searchBtnEl.disabled = true;
    }
  }