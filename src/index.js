import './scss/base.scss';

import QuizeGenerator from './utils/QuizeGenerator';
import DataStorage from './utils/DataStorage';
import { UrlParser } from './utils/UrlParser';

import Home from './components/Home/Home';
import Error404 from './components/Error404';
import Categories from './components/Categories/Categories';
import PaintsQuize from './components/PaintsQuize/PaintsQuize';
import ArtistQuize from './components/ArtistQuize/ArtistQuize';
import Loader from './components/Loader/Loader';

const quizes = new QuizeGenerator().generate();
const homeInstance = new Home(quizes);
const paintsQuizeCategoriesInstance = new Categories('Викторины с картинами', 'paintsQuize', quizes.paintsQuize);
const artistQuizeCategoriesInstance = new Categories('Викторины с авторами', 'artistQuize', quizes.artistQuize);
const error404Instance = new Error404();
console.log(quizes);
const simpleRoutes = {
  '/': homeInstance,
  '/paintsquize': paintsQuizeCategoriesInstance,
  '/artistquize': artistQuizeCategoriesInstance,
};

const router = async () => {
  const request = UrlParser.parseRequestURL();

  const parsedURL = (request.resource ? `/${request.resource}` : '/') + (request.id ? '/:id' : '') + (request.verb ? `/${request.verb}` : '');
  const loader = new Loader();
  await loader.render();

  if (request.id) {
    if (request.resource === 'paintsquize' && request.id < quizes.paintsQuize.length) {
      await new PaintsQuize(
        request.id,
        new QuizeGenerator().generate().paintsQuize[request.id],
      ).render();
    } else if (request.resource === 'artistquize' && request.id < quizes.artistQuize.length) {
      await new ArtistQuize(
        request.id,
        new QuizeGenerator().generate().artistQuize[request.id],
      ).render();
    } else {
      error404Instance.render();
    }
  } else {
    const page = simpleRoutes[parsedURL] ? simpleRoutes[parsedURL] : error404Instance;
    await page.render();
  }

  loader.remove();
};

DataStorage.initResults();

window.addEventListener('popstate', router);
window.addEventListener('load', router);
