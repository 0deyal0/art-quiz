import './resultmodal.scss';

export default class QuestionResult {
  constructor(isRight, imgUrl, author) {
    this.isRight = isRight;
    this.imgUrl = imgUrl;
    this.author = author;
  }

  render(nextCallback) {
    const modalOverlayElem = document.createElement('div');
    modalOverlayElem.classList.add('result-modal__overlay');

    const modalElem = document.createElement('div');
    modalElem.classList.add('result-modal');
    modalOverlayElem.append(modalElem);

    const verdictElem = document.createElement('p');
    verdictElem.classList.add('result-modal__verdict');
    verdictElem.classList.add(this.isRight ? 'result-modal__verdict--right' : 'result-modal__verdict--wrong');
    verdictElem.innerText = this.isRight ? 'Правильно!' : 'Неправильно!';

    const imgContainer = document.createElement('div');
    imgContainer.classList.add('result-modal__image-container');

    const imgElem = document.createElement('div');
    imgElem.classList.add('result-modal__image');
    imgElem.style
      .backgroundImage = `url('${this.imgUrl}')`;

    const descElem = document.createElement('div');
    descElem.classList.add('result-modal__image--desc');
    descElem.innerText = this.author;

    imgContainer.append(imgElem, descElem);

    const nextButtonElem = document.createElement('button');
    nextButtonElem.classList.add('next-button', 'result-modal__next-button');
    nextButtonElem.innerText = 'Далее';
    nextButtonElem.addEventListener('click', () => {
      setTimeout(() => { this.show(false); }, 0);
      setTimeout(() => { modalOverlayElem.remove(); }, 500);
      nextCallback();
    });

    modalElem.append(verdictElem, imgContainer, nextButtonElem);

    this.modalOverlayElem = modalOverlayElem;

    document.querySelector('body').append(modalOverlayElem);
  }

  show(isOpen) {
    if (!this.modalOverlayElem) {
      return;
    }

    if (isOpen) {
      this.modalOverlayElem.classList.add('result-modal__overlay--show');
    } else {
      this.modalOverlayElem.classList.remove('result-modal__overlay--show');
    }
  }
}
