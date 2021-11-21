import imgsData from '../assets/images.json';
import DataStorage from './DataStorage';

export default class QuizeGenerator {
  generate() {
    this.artistQustions = [];
    this.paintsQustions = [];
    const authors = Array.from(new Set(imgsData.images.map((imgData) => imgData.author)));
    const shuffleArray = (array) => array
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);

    const formQuizes = (resultArray, item, index) => {
      const chunkIndex = Math.floor(index / 10);

      if (!resultArray[chunkIndex]) {
        // eslint-disable-next-line no-param-reassign
        resultArray[chunkIndex] = [];
      }

      resultArray[chunkIndex].push(item);

      return resultArray;
    };

    imgsData.images.forEach((imgData) => {
      const wrongAuthors = shuffleArray(authors).slice(-4)
        .filter((author) => author !== imgData.author)
        .slice(-3)
        .map((author) => ({ author, isRight: false }));
      this.paintsQustions.push({
        imgSrc: DataStorage.getImgUrlById(imgData.imageNum),
        imgFullSrc: DataStorage.getFullImgUrlById(imgData.imageNum),
        answers: shuffleArray([
          { author: imgData.author, isRight: true },
          ...wrongAuthors,
        ]),
      });
    });

    this.artistQuize = this.paintsQustions.reduce(formQuizes, [])
      .filter((quizArr) => quizArr.length === 10);

    authors.forEach((author) => {
      const wrongImgsData = shuffleArray(imgsData.images)
        .filter((imgData) => author !== imgData.author)
        .slice(-3);
      const rightImgData = imgsData.images.find((imgData) => imgData.author === author);
      this.artistQustions.push({
        author,
        answers: shuffleArray([
          {
            imgSrc: DataStorage.getImgUrlById(rightImgData.imageNum),
            imgFullSrc: DataStorage.getFullImgUrlById(rightImgData.imageNum),
            isRight: true,
          },
          ...wrongImgsData.map((imgData) => ({
            imgSrc: DataStorage.getImgUrlById(imgData.imageNum),
            imgFullSrc: DataStorage.getFullImgUrlById(imgData.imageNum),
            isRight: false,
          })),
        ]),
      });
    });

    this.paintsQuize = this.artistQustions.reduce(formQuizes, [])
      .filter((quizArr) => quizArr.length === 10);

    return { artistQuize: this.artistQuize, paintsQuize: this.paintsQuize };
  }
}
