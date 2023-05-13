import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.min.css';
import { UnsplashAPI } from './UnsplashAPI';
import { createGalleryCard } from './createGalleryCard'
const api = new UnsplashAPI();


const ulEl = document.querySelector('.js-gallery')
const container = document.getElementById('tui-pagination-container');
const options = { // below default value of options
    totalItems: 0,
    itemsPerPage: 12,
    visiblePages: 5,
    page: 1,
}
const pagination = new Pagination(container, options);

const page = pagination.getCurrentPage();
api.getPopularImg(page).then(({ results, total }) => {
    pagination.reset(total);
let markup = createGalleryCard(results);
ulEl.innerHTML = markup;
});