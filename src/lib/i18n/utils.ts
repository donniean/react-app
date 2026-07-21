const modules = import.meta.glob('../../locales/*/*.json');
const resourcePaths = Object.keys(modules);

const namespaces = [
  ...new Set(
    resourcePaths
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
].toSorted();

const supportedLanguages = [
  ...new Set(resourcePaths.map((key) => key.split('/').at(-2) ?? '').filter(Boolean)),
].toSorted();

export { modules, namespaces, supportedLanguages };
