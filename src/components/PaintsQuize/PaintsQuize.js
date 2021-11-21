import DataStorage from '../../utils/DataStorage';
import QuestionResult from '../QuestionResult/QuestionResult';
import QuizeResult from '../QuizeResult/QuizeResult';

import './paintsquize.scss';

export default class PaintsQuize {
  constructor(categoryId, quetions) {
    this.categoryId = categoryId;
    this.quetions = quetions;
  }

  render(questionIndex = 0) {
    if (questionIndex === 0) {
      DataStorage.initCurResult();
    }

    const currentQuestion = this.quetions[questionIndex];

    const mainElem = document.getElementById('main');

    const sectionElem = document.createElement('section');
    sectionElem.classList.add('paintsquize');

    const answersElem = document.createElement('div');
    answersElem.classList.add('paintsquize__answers');

    const radioButtonsName = 'paintsquize__answer';
    const answersElems = currentQuestion.answers.map((answer, index) => {
      const labelElem = document.createElement('label');
      labelElem.classList.add('paintsquize__answer');

      const inputElem = document.createElement('input');
      inputElem.setAttribute('type', 'radio');
      inputElem.name = radioButtonsName;
      inputElem.id = `paintsquize__answer${index}`;
      inputElem.value = index;
      inputElem.addEventListener('click', () => {
        const nextButton = document.querySelector('#paintsquize__next-button');
        nextButton.disabled = false;
      });

      const imageElem = document.createElement('div');
      imageElem.classList.add('paintsquize__image');
      imageElem.style.backgroundImage = `url('${answer.imgFullSrc}')`;

      labelElem.append(inputElem, imageElem);

      return labelElem;
    });

    answersElem.append(...answersElems);

    const questionElem = document.createElement('div');
    questionElem.classList.add('paintsquize__question');
    questionElem.innerText = `Which is the ${currentQuestion.author} picture?`;

    const nextContainerElem = document.createElement('div');
    nextContainerElem.classList.add('paintsquize__next-container');

    const currentQuizeRes = DataStorage.loadCurResult();
    const progressContainer = document.createElement('div');
    progressContainer.classList.add('paintsquize__progress-container');

    const progressElems = this.quetions.map((question, index) => {
      const progressElem = document.createElement('div');
      progressElem.classList.add('paintsquize__progress');
      if (index < currentQuizeRes.length) {
        if (currentQuizeRes[index]) {
          progressElem.classList.add('paintsquize__progress-right');
        } else {
          progressElem.classList.add('paintsquize__progress-wrong');
        }
      } else if (index === currentQuizeRes.length) {
        progressElem.classList.add('paintsquize__progress-current');
      }

      return progressElem;
    });
    progressContainer.append(...progressElems);

    const nextButtonElem = document.createElement('button');
    nextButtonElem.classList.add('next-button');
    nextButtonElem.id = 'paintsquize__next-button';
    nextButtonElem.innerText = 'Next';
    nextButtonElem.disabled = true;
    nextButtonElem.addEventListener('click', () => {
      const { value } = document.querySelector(`input[name="${radioButtonsName}"]:checked`);
      const answer = this.quetions[questionIndex].answers[value];
      const rightAnswer = this.quetions[questionIndex].answers.find(({ isRight }) => isRight);

      currentQuizeRes.push(answer === rightAnswer);
      DataStorage.saveCurResult(currentQuizeRes);

      const paintsQuestionRes = new QuestionResult(
        answer === rightAnswer,
        rightAnswer.imgFullSrc,
        currentQuestion.author,
      );

      if (questionIndex < this.quetions.length - 1) {
        // eslint-disable-next-line no-extra-bind
        paintsQuestionRes.render((() => { this.render(questionIndex + 1); }).bind(this));
      } else {
        const resultsData = DataStorage.loadResults();

        let res = currentQuizeRes.filter((isRight) => isRight).length;
        // eslint-disable-next-line no-prototype-builtins
        if (resultsData.paintsQuize.hasOwnProperty(this.categoryId)) {
          const savedRes = resultsData.paintsQuize[this.categoryId];

          if (res < savedRes) {
            res = savedRes;
          }
        }

        resultsData.paintsQuize[this.categoryId] = res;

        DataStorage.saveResults(resultsData);

        paintsQuestionRes.render((() => { new QuizeResult().render(); }));
      }
    });

    nextContainerElem.append(nextButtonElem);

    sectionElem.append(questionElem, answersElem, progressContainer, nextContainerElem);
    mainElem.innerHTML = '';

    mainElem.append(sectionElem);
  }
}
