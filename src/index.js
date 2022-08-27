import Notiflix from 'notiflix';
// import InfiniteScroll from 'infinite-scroll';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import SearchObj from './partials/searchFunction.js';
import LoadMoreBtn from './partials/loadMoreBtn.js';

const refs = {
  formEL: document.querySelector('.search-form'),
  inputField: document.querySelector('.search-input'),
  searchBtn: document.querySelector('.search-button'),
  galleryEl: document.querySelector('.gallery'),
};

const searchObj = new SearchObj();
const loadMoreBtn = new LoadMoreBtn('.load-btn');
const lightbox = new SimpleLightbox('.gallery a', {});
// const infiniteScroll = new InfiniteScroll(refs.galleryEl, {
//   path: '.load-btn',
//   append: '.post',
//   history: false,
// });

refs.formEL.addEventListener('submit', searchImages);
loadMoreBtn.loadBtn.addEventListener('click', loadMoreImages);

function searchImages(evt) {
  evt.preventDefault();

  //   searchObj.value = evt.currentTarget.elements.searchQuery.value;
  searchObj.value = refs.inputField.value;

  clearGalleryMarkup();
  searchObj.setPage();
  startPictureSearch();
}

async function startPictureSearch() {
  try {
    const response = await searchObj.startSearch();
    const hits = await checkQty(response);
    const data = await appendHitsMarkup(hits);
    const show = await loadMoreBtn.show();
    const enable = await loadMoreBtn.enabled();
    const refresh = lightbox.refresh();
  } catch (error) {
    console.error(error);
  }
}
// function startPictureSearch() {
//   searchObj
//     .startSearch()
//     .then(response => checkQty(response))
//     .then(hits => appendHitsMarkup(hits))
//     .then(data => showTotalFind())
//     .then(data => {
//       loadMoreBtn.show();
//       loadMoreBtn.enabled();
//       lightbox.refresh();
//     })
//     .catch(error => console.log(error));
// }

function checkQty({ total, hits }) {
  if (!total) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
  return hits;
}

function appendHitsMarkup(hits) {
  const hitsMarkup = hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<a href='${largeImageURL}' class="photo-card">
         <div class="img-container">
         <img class="photo-image" src="${webformatURL}" alt="${tags}" loading="lazy" />
         </div>
            <div class="info">
                <p class="info-item">
                <b>Likes</b>
                ${likes}
                </p>
                <p class="info-item">
                <b>Views</b>
                ${views}
                </p>
                <p class="info-item">
                <b>Comments</b>
                ${comments}
                </p>
                <p class="info-item">
                <b>Downloads</b>
                ${downloads}
                </p>
            </div>
         </a>`
    )
    .join('');

  refs.galleryEl.insertAdjacentHTML('beforeEnd', hitsMarkup);

  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

function clearGalleryMarkup() {
  refs.galleryEl.innerHTML = '';
}

function loadMoreImages() {
  loadMoreBtn.disabled();
  checkLastPage();
  searchObj.incresePage();
  startPictureSearch();
}

function checkLastPage() {
  if (searchObj.page === Math.ceil(searchObj.totalHits / searchObj.perPage)) {
    return Notiflix.Notify.warning(
      "We're sorry, but you've reached the end of search results."
    );
  }
}

function showTotalFind() {
  if (searchObj.page === 1) {
    Notiflix.Notify.success(`Hooray! We found ${searchObj.totalHits} images.`);
  }
}
