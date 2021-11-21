import DataStorage from '../../utils/DataStorage';

import './categories.scss';

export default class Categories {
  constructor(quizeName, quizeType, quize) {
    this.quizeName = quizeName;
    this.quizeType = quizeType;
    this.quize = quize;
  }

  render() {
    const mainElem = document.getElementById('main');

    const categoriesElem = document.createElement('section');
    categoriesElem.classList.add('categories');

    const categoriesNameElem = document.createElement('h1');
    categoriesNameElem.classList.add('categories__name');
    categoriesNameElem.innerText = `${this.quizeName} categories`;

    let categoriesElems = [];

    if (this.quizeType === 'artistQuize') {
      const artistQuizeResults = DataStorage.loadResults().artistQuize;

      // eslint-disable-next-line array-callback-return
      categoriesElems = this.quize.map((questions, index) => {
        const categoryElem = document.createElement('a');
        categoryElem.classList.add('category');
        categoryElem.href = `#/artistquize/${index}`;
        categoryElem.style.setProperty('--background', `url('${questions[0].imgFullSrc}')`);
        const categoryContentElem = document.createElement('div');
        categoryContentElem.classList.add('category__content');

        const categoryNumberElem = document.createElement('p');
        categoryNumberElem.classList.add('category__number');
        categoryNumberElem.innerText = index + 1;

        categoryContentElem.appendChild(categoryNumberElem);

        // eslint-disable-next-line no-prototype-builtins
        if (artistQuizeResults.hasOwnProperty(index)) {
          // eslint-disable-next-line no-mixed-operators
          const successPercent = artistQuizeResults[index] / questions.length * 100;

          if (successPercent < 50) {
            categoryContentElem.classList.add('category__content--bad');
          } else if (successPercent < 70) {
            categoryContentElem.classList.add('category__content--silver');
          } else {
            categoryContentElem.classList.add('category__content--gold');
          }

          const categoryResElem = document.createElement('div');
          categoryResElem.classList.add('category__result');
          categoryResElem.innerText = `${artistQuizeResults[index]}/${questions.length}`;
          categoryContentElem.appendChild(categoryResElem);
        }
        categoryElem.appendChild(categoryContentElem);

        return categoryElem;
      });
    } else if (this.quizeType === 'paintsQuize') {
      const paintsQuizeResults = DataStorage.loadResults().paintsQuize;

      categoriesElems = this.quize.map((questions, index) => {
        const categoryElem = document.createElement('a');
        categoryElem.classList.add('category');
        categoryElem.href = `#/paintsquize/${index}`;
        categoryElem.style.setProperty('--background', `url('${questions[0].answers[0].imgFullSrc}')`);
        const categoryContentElem = document.createElement('div');
        categoryContentElem.classList.add('category__content');

        const categoryNumberElem = document.createElement('p');
        categoryNumberElem.classList.add('category__number');
        categoryNumberElem.innerText = index + 1;

        categoryContentElem.appendChild(categoryNumberElem);

        // eslint-disable-next-line no-prototype-builtins
        if (paintsQuizeResults.hasOwnProperty(index)) {
          // eslint-disable-next-line no-mixed-operators
          const successPercent = paintsQuizeResults[index] / questions.length * 100;

          if (successPercent < 50) {
            categoryContentElem.classList.add('category__content--bad');
          } else if (successPercent < 70) {
            categoryContentElem.classList.add('category__content--silver');
          } else {
            categoryContentElem.classList.add('category__content--gold');
          }

          const categoryResElem = document.createElement('div');
          categoryResElem.classList.add('category__result');
          categoryResElem.innerText = `${paintsQuizeResults[index]}/${questions.length}`;
          categoryContentElem.appendChild(categoryResElem);
        }
        categoryElem.appendChild(categoryContentElem);

        return categoryElem;
      });
    }

    categoriesElem.append(...categoriesElems);
    mainElem.innerHTML = '';
    mainElem.append(categoriesNameElem, categoriesElem);
  }
}
