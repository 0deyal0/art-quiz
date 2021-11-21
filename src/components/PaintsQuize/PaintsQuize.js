import DataStorage from '../../utils/DataStorage';
import QuestionResult from '../QuestionResult/QuestionResult';
import QuizeResult from '../QuizeResult/QuizeResult';
import Loader from '../Loader/Loader';

import ImagesPreloader from '../../utils/ImagesPreloader';

import './paintsquize.scss';

export default class PaintsQuize {
  constructor(categoryId, quetions) {
    this.categoryId = categoryId;
    this.quetions = quetions;
  }

  async render(questionIndex = 0) {
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

    const answersElems = await Promise.all(currentQuestion.answers.map(async (answer, index) => {
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
      const backgroundImg = await ImagesPreloader.loadImage(answer.imgFullSrc);
      imageElem.style.backgroundImage = `url('${backgroundImg.src}')`;

      labelElem.append(inputElem, imageElem);

      return labelElem;
    }));

    answersElem.append(...answersElems);

    const questionElem = document.createElement('div');
    questionElem.classList.add('paintsquize__question');
    questionElem.innerText = `Автором какой картины является ${currentQuestion.author}?`;

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
    nextButtonElem.innerText = 'Далее';
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
        paintsQuestionRes.render((async () => {
          const loader = new Loader();
          await loader.render();
          await this.render(questionIndex + 1);
          await loader.remove();
          // eslint-disable-next-line no-extra-bind
        }).bind(this));
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

        paintsQuestionRes.render((async () => { await new QuizeResult().render(); }));
      }
    });

    nextContainerElem.append(nextButtonElem);

    sectionElem.append(questionElem, answersElem, progressContainer, nextContainerElem);
    mainElem.innerHTML = '';

    mainElem.append(sectionElem);
  }
}
