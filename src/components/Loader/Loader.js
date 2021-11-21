import './loader.scss';

export default class Loader {
  async render() {
    const body = document.querySelector('body');

    const spinnerContainer = document.createElement('div');
    spinnerContainer.classList.add('lds-spinner__container');
    spinnerContainer.innerHTML = `
        <div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    `;
    this.spinnerContainer = spinnerContainer;
    body.append(spinnerContainer);
  }

  // eslint-disable-next-line class-methods-use-this
  remove() {
    this.spinnerContainer.remove();
  }
}
