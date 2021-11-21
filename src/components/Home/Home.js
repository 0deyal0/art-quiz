import DataStorage from '../../utils/DataStorage';
import ImagesPreloader from '../../utils/ImagesPreloader';

import './mainscreen.scss';

export default class Home {
  constructor(quizes) {
    this.quizes = quizes;
  }

  async render() {
    // eslint-disable-next-line no-unused-vars
    const cards = await Promise.all(Object.entries(this.quizes).map(async ([key, value], index) => {
      const cardElem = document.createElement('a');
      cardElem.classList.add('mainscreen-category__card');

      const cardImageElem = document.createElement('div');
      const backgroundImg = await ImagesPreloader.loadImage(DataStorage.getFullImgUrlById(index));
      cardImageElem.style.backgroundImage = `url('${backgroundImg.src}')`;
      cardImageElem.classList.add('mainscreen-category__card--image');

      const cardCaptionElem = document.createElement('p');
      let quizeName = '';

      if (key === 'paintsQuize') {
        quizeName = 'Викторины с картинами';
        cardElem.href = '#/paintsquize';
      } else if (key === 'artistQuize') {
        quizeName = 'Викторины с авторами';
        cardElem.href = '#/artistquize';
      }
      cardCaptionElem.innerText = quizeName;
      cardCaptionElem.classList.add('mainscreen-category__card--caption');

      cardElem.appendChild(cardImageElem);
      cardElem.appendChild(cardCaptionElem);

      return cardElem;
    }));

    const cardsElem = document.createElement('div');
    cardsElem.classList.add('mainscreen-category__cards');
    cards.forEach((card) => {
      cardsElem.append(card);
    });

    const sectionElem = document.createElement('section');
    sectionElem.classList.add('mainscreen');
    sectionElem.append(cardsElem);

    const mainElem = document.getElementById('main');
    mainElem.innerHTML = '';
    mainElem.append(sectionElem);
    // return sectionElem;
  }
}
