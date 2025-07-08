interface Resources {
  common: {
    hello: 'Hello {{entity}}';
  };
  errors: {
    'app.title': 'Something went wrong';
    'app.actions.retry': 'Retry';
    'route.title': 'An unexpected error occurred';
    'notFound.title': '404 - Not Found';
    'notFound.actions.back': 'Back to Home';
  };
  glossary: {
    'term.react': 'React';
  };
}

export default Resources;
