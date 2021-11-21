export default class DataStorage {
  static RESULTS_KEY = 'results';

  static CURRENT_RESULTS_KEY = 'currentQuizeRes';

  static initResults() {
    if (window.localStorage.getItem(DataStorage.RESULTS_KEY) === null) {
      window.localStorage.setItem(
        DataStorage.RESULTS_KEY,
        JSON.stringify({ paintsQuize: {}, artistQuize: {} }),
      );
    }
  }

  static loadResults() {
    return JSON.parse(window.localStorage.getItem(DataStorage.RESULTS_KEY));
  }

  static saveResults(results) {
    window.localStorage.setItem(DataStorage.RESULTS_KEY, JSON.stringify(results));
  }

  static initCurResult() {
    window.localStorage.setItem(DataStorage.CURRENT_RESULTS_KEY, JSON.stringify([]));
  }

  static saveCurResult(currentQuizeRes) {
    window.localStorage.setItem(DataStorage.CURRENT_RESULTS_KEY, JSON.stringify(currentQuizeRes));
  }

  static loadCurResult() {
    return JSON.parse(window.localStorage.getItem(DataStorage.CURRENT_RESULTS_KEY));
  }

  static getFullImgUrlById(imageNum) {
    return `https://raw.githubusercontent.com/0deyal0/art-quiz/images/images/paintings-full/${imageNum}full.jpg`;
  }

  static getImgUrlById(imageNum) {
    return `https://raw.githubusercontent.com/0deyal0/art-quiz/images/images/paintings/${imageNum}.jpg`;
  }
}
