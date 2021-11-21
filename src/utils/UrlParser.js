/* eslint-disable prefer-destructuring */
export const UrlParser = {
  parseRequestURL: () => {
    // eslint-disable-next-line no-restricted-globals
    console.log(location.hash);
    // eslint-disable-next-line no-restricted-globals
    const url = location.hash.slice(1).toLowerCase() || '/';

    const r = url.split('/');

    const request = {
      resource: null,
      id: null,
      verb: null,
    };

    request.resource = r[1];
    request.id = r[2];
    request.verb = r[3];

    return request;
  },

  // eslint-disable-next-line no-promise-executor-return
  sleep: (ms) => new Promise((resolve) => setTimeout(resolve, ms)),
};

export default UrlParser;
