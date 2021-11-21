import './mainscreen.scss';

export default class Home {
  constructor(quizes) {
    this.quizes = quizes;
  }

  render() {
    // eslint-disable-next-line no-unused-vars
    const cards = Object.entries(this.quizes).map(([key, value], index) => {
      const cardElem = document.createElement('a');
      cardElem.classList.add('mainscreen-category__card');

      const cardImageElem = document.createElement('div');
      cardImageElem.style.backgroundImage = `url('https://raw.githubusercontent.com/0deyal0/art-quiz/images/images/paintings/${index}.jpg')`;
      cardImageElem.classList.add('mainscreen-category__card--image');

      const cardCaptionElem = document.createElement('p');
      let quizeName = '';

      if (key === 'paintsQuize') {
        quizeName = 'Paints quize';
        cardElem.href = '#/paintsquize';
      } else if (key === 'artistQuize') {
        quizeName = 'Artist quize';
        cardElem.href = '#/artistquize';
      }
      cardCaptionElem.innerText = quizeName;
      cardCaptionElem.classList.add('mainscreen-category__card--caption');

      cardElem.appendChild(cardImageElem);
      cardElem.appendChild(cardCaptionElem);

      // cardElem.addEventListener('click', () => {
      //   new Categories(quizeName, key, value).render();
      // });

      return cardElem;
    });

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
