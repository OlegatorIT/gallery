import { UnsplashAPI } from './UnsplashAPI';

const api = new UnsplashAPI();

api.getPopularImg(1).then(data => console.log(data));
