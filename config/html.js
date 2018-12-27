const title = 'React Webpack Boilerplate';

const htmlList = [
  {
    input: {
      html: 'index',
      js: 'index'
    },
    output: {
      html: 'index',
      htmlTitle: title,
      js: 'app'
    }
  }
];

const faviconAppTitle = title;

module.exports = { htmlList, faviconAppTitle };
