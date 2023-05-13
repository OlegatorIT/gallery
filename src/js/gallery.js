import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.min.css';
import { UnsplashAPI } from './UnsplashAPI';
import { createGalleryCard } from './createGalleryCard';
const api = new UnsplashAPI();
const formEl = document.querySelector('.js-search-form');

const ulEl = document.querySelector('.js-gallery');
const container = document.getElementById('tui-pagination-container');
const options = {
  // below default value of options
  totalItems: 0,
  itemsPerPage: 12,
  visiblePages: 5,
  page: 1,
};
const pagination = new Pagination(container, options);

const page = pagination.getCurrentPage();
api.getPopularImg(page).then(({ results, total }) => {
  pagination.reset(total);
  let markup = createGalleryCard(results);
  ulEl.innerHTML = markup;
});

pagination.on('afterMove', popular);

function popular(event) {
  const currentPage = event.page;
  console.log(currentPage);
  api.getPopularImg(currentPage).then(({ results }) => {
    let markup = createGalleryCard(results);
    ulEl.innerHTML = markup;
  });
}

formEl.addEventListener('submit', onSubmit);

function onSubmit(evt) {
  evt.preventDefault();
  const { query } = evt.target.elements;
  api.query = query.value.trim();
  pagination.off('afterMove', popular);
  pagination.off('afterMove', byQuery);
  api.getImagesByQuery(page).then(({ results, total }) => {
    pagination.reset(total);
    let markup = createGalleryCard(results);
    ulEl.innerHTML = markup;
  });

  pagination.on('afterMove', byQuery);
}

function byQuery(event) {
  const currentPage = event.page;
  console.log(currentPage);
  api.getImagesByQuery(currentPage).then(({ results }) => {
    let markup = createGalleryCard(results);
    ulEl.innerHTML = markup;
  });
}
