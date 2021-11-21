import './scss/base.scss';

import QuizeGenerator from './utils/QuizeGenerator';
import DataStorage from './utils/DataStorage';
import { UrlParser } from './utils/UrlParser';

import Home from './components/Home/Home';
import Error404 from './components/Error404';
import Categories from './components/Categories/Categories';
import PaintsQuize from './components/PaintsQuize/PaintsQuize';
import ArtistQuize from './components/ArtistQuize/ArtistQuize';

// window.addEventListener('load', () => {

//   console.log(quizes);
// });
const quizes = new QuizeGenerator().generate();
const homeInstance = new Home(quizes);
const paintsQuizeCategoriesInstance = new Categories('Paints quize', 'paintsQuize', quizes.paintsQuize);
const artistQuizeCategoriesInstance = new Categories('Artist quize', 'artistQuize', quizes.artistQuize);
// const paintQuizeInstance = new PaintsQuize(quizes.paintsQuize);
const error404Instance = new Error404();
console.log(quizes);
const simpleRoutes = {
  '/': homeInstance,
  '/paintsquize': paintsQuizeCategoriesInstance,
  '/artistquize': artistQuizeCategoriesInstance,
};

const router = () => {
  // const header = null || document.getElementById('header_container');
  // const content = null || document.querySelector('main');
  // const footer = null || document.getElementById('footer_container');
  // header.innerHTML = await headerInstance.render();
  // await headerInstance.after_render();

  // footer.innerHTML = await footerInstance.render();
  // await footerInstance.after_render();

  const request = UrlParser.parseRequestURL();

  const parsedURL = (request.resource ? `/${request.resource}` : '/') + (request.id ? '/:id' : '') + (request.verb ? `/${request.verb}` : '');

  if (request.id) {
    if (request.resource === 'paintsquize' && request.id < quizes.paintsQuize.length) {
      new PaintsQuize(request.id, new QuizeGenerator().generate().paintsQuize[request.id]).render();
    } else if (request.resource === 'artistquize' && request.id < quizes.artistQuize.length) {
      new ArtistQuize(request.id, new QuizeGenerator().generate().artistQuize[request.id]).render();
    } else {
      error404Instance.render();
    }
  } else {
    const page = simpleRoutes[parsedURL] ? simpleRoutes[parsedURL] : error404Instance;

    // console.log(page.render().html());

    page.render();
  }
  // page.after_render();
};

DataStorage.initResults();

window.addEventListener('popstate', router);
window.addEventListener('load', router);
