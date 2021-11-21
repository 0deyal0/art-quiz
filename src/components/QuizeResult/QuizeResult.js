import DataStorage from '../../utils/DataStorage';

import './quizeresult.scss';

export default class QuizeResult {
  render() {
    const currentQuizeRes = DataStorage.loadCurResult();
    // eslint-disable-next-line arrow-body-style
    const successPercent = currentQuizeRes.filter((answerSuccess) => {
      return answerSuccess;
      // eslint-disable-next-line no-mixed-operators
    }).length / currentQuizeRes.length * 100;

    // eslint-disable-next-line no-nested-ternary
    const verdict = successPercent < 50 ? 'Провалено' : successPercent < 70 ? 'Неплохо!' : 'Отлично!';

    const cupElement = document.createElement('div');
    cupElement.classList.add('quize-result-modal__cup');

    if (successPercent < 50) {
      cupElement.classList.add('quize-result-modal__cup--none');
    } else if (successPercent < 70) {
      cupElement.classList.add('quize-result-modal__cup--silver');
    } else {
      cupElement.classList.add('quize-result-modal__cup--gold');
    }

    const modalOverlayElem = document.createElement('div');
    modalOverlayElem.classList.add('quize-result-modal__overlay');

    const modalElem = document.createElement('div');
    modalElem.classList.add('quize-result-modal');

    const scoreElem = document.createElement('p');
    scoreElem.classList.add('quize-result-modal__score');
    scoreElem.innerText = `${currentQuizeRes.filter((answerSuccess) => answerSuccess).length}/${currentQuizeRes.length}`;

    const verdictElem = document.createElement('p');
    verdictElem.classList.add('quize-result-modal__verdict');
    verdictElem.innerText = verdict;

    const buttonsElem = document.createElement('div');
    buttonsElem.classList.add('quize-result-modal__buttons');

    const homeButtonElem = document.createElement('a');
    homeButtonElem.classList.add('quize-result-modal__button');
    homeButtonElem.href = '/';
    homeButtonElem.innerText = 'Завершить';
    buttonsElem.append(homeButtonElem);

    if (successPercent < 50) {
      const tryAgainButtonElem = document.createElement('a');
      tryAgainButtonElem.classList.add('quize-result-modal__button');
      tryAgainButtonElem.href = window.location;
      tryAgainButtonElem.innerText = 'Попробовать еще раз';
      tryAgainButtonElem.addEventListener('click', () => modalOverlayElem.remove());

      buttonsElem.append(tryAgainButtonElem);
    }

    modalElem.append(scoreElem, cupElement, verdictElem, buttonsElem);
    modalOverlayElem.append(modalElem);

    document.querySelector('body').append(modalOverlayElem);
  }
}
