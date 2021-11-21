import DataStorage from '../../utils/DataStorage';
import QuestionResult from '../QuestionResult/QuestionResult';
import QuizeResult from '../QuizeResult/QuizeResult';

import './artistquize.scss';

export default class ArtistQuize {
  constructor(categoryId, quetions) {
    this.categoryId = categoryId;
    this.quetions = quetions;
  }

  render(questionIndex = 0) {
    if (questionIndex === 0) {
      DataStorage.initCurResult();
    }

    const currentQuestion = this.quetions[questionIndex];

    const currentQuizeRes = DataStorage.loadCurResult();

    const mainElem = document.getElementById('main');

    const sectionElem = document.createElement('section');
    sectionElem.classList.add('artistquize');

    const imageContainer = document.createElement('div');
    imageContainer.classList.add('artistquize__image-container');

    const imageElem = document.createElement('div');
    imageElem.classList.add('artistquize__image');
    imageElem.style.backgroundImage = `url('${currentQuestion.imgFullSrc}')`;
    console.log(currentQuestion);
    imageContainer.append(imageElem);

    const progressContainer = document.createElement('div');
    progressContainer.classList.add('artistquize__progress-container');

    const progressElems = this.quetions.map((question, index) => {
      const progressElem = document.createElement('div');
      progressElem.classList.add('artistquize__progress');
      if (index < currentQuizeRes.length) {
        if (currentQuizeRes[index]) {
          progressElem.classList.add('artistquize__progress-right');
        } else {
          progressElem.classList.add('artistquize__progress-wrong');
        }
      } else if (index === currentQuizeRes.length) {
        progressElem.classList.add('artistquize__progress-current');
      }

      return progressElem;
    });
    progressContainer.append(...progressElems);

    const questionElem = document.createElement('div');
    questionElem.classList.add('artistquize__question');
    questionElem.innerText = 'Who is the author of the picture?';

    const answersElem = document.createElement('div');
    answersElem.classList.add('artistquize__answers');

    const radioButtonsName = 'artistquize__answer';

    const answersElems = currentQuestion.answers.map((answer, index) => {
      const inputElem = document.createElement('input');
      inputElem.setAttribute('type', 'radio');
      inputElem.name = radioButtonsName;
      const radioButtonId = `artistquize__answer${index}`;
      inputElem.id = radioButtonId;
      inputElem.value = index;
      inputElem.addEventListener('click', () => {
        const nextButton = document.querySelector('#artistquize__next-button');
        nextButton.disabled = false;
      });

      const labelElem = document.createElement('label');
      labelElem.setAttribute('for', radioButtonId);
      labelElem.innerText = answer.author;

      return [inputElem, labelElem];
    });

    answersElem.append(...answersElems.reduce((prev, cur) => prev.concat(cur)));

    const nextContainerElem = document.createElement('div');
    nextContainerElem.classList.add('artistquize__next-container');

    const nextButtonElem = document.createElement('button');
    nextButtonElem.classList.add('next-button');
    nextButtonElem.id = 'artistquize__next-button';
    nextButtonElem.innerText = 'Next';
    nextButtonElem.disabled = true;
    nextButtonElem.addEventListener('click', () => {
      const { value } = document.querySelector(`input[name="${radioButtonsName}"]:checked`);
      console.log(value);
      const answer = this.quetions[questionIndex].answers[value];
      const rightAnswer = this.quetions[questionIndex].answers.find(({ isRight }) => isRight);

      currentQuizeRes.push(answer === rightAnswer);
      DataStorage.saveCurResult(currentQuizeRes);

      const questionRes = new QuestionResult(
        answer === rightAnswer,
        currentQuestion.imgFullSrc,
        rightAnswer.author,
      );

      if (questionIndex < this.quetions.length - 1) {
        // eslint-disable-next-line no-extra-bind
        questionRes.render((() => { this.render(questionIndex + 1); }).bind(this));
      } else {
        const resultsData = DataStorage.loadResults();

        let res = currentQuizeRes.filter((isRight) => isRight).length;
        // eslint-disable-next-line no-prototype-builtins
        if (resultsData.artistQuize.hasOwnProperty(this.categoryId)) {
          const savedRes = resultsData.artistQuize[this.categoryId];

          if (res < savedRes) {
            res = savedRes;
          }
        }

        resultsData.artistQuize[this.categoryId] = res;

        DataStorage.saveResults(resultsData);

        questionRes.render((() => { new QuizeResult().render(); }));
      }
    });

    nextContainerElem.append(nextButtonElem);

    sectionElem.append(
      imageContainer,
      progressContainer,
      questionElem,
      answersElem,
      nextContainerElem,
    );
    mainElem.innerHTML = '';

    mainElem.append(sectionElem);
  }
}
