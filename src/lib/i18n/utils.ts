const modules = import.meta.glob('../../locales/*/*.json');

const namespaces = [
  ...new Set(
    Object.keys(modules)
      .map((key) => {
        const list = key.split('/');
        const fileName = list.at(-1);

        if (!fileName) {
          return '';
        }

        if (!fileName.endsWith('.json')) {
          return '';
        }

        const namespace = fileName.replace('.json', '');
        return namespace;
      })
      .filter(Boolean),
  ),
];

export { modules, namespaces };
