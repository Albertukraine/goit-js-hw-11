

export function clearHTML(refsObj, hideButton) {
    refsObj.galleryEl.innerHTML = ' ';
    pageNumber = 1;
    hideButton(refsObj);
    refsObj.searchBtnEl.disabled = false;
  }
