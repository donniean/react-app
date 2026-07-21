const resourceModules = import.meta.glob('../../locales/*/*.json');
const resourcePaths = Object.keys(resourceModules);

const namespaces = [
  ...new Set(
    resourcePaths
      .map((resourcePath) => {
        const list = resourcePath.split('/');
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
  ...new Set(
    resourcePaths.map((resourcePath) => resourcePath.split('/').at(-2) ?? '').filter(Boolean),
  ),
].toSorted();

export { namespaces, resourceModules, supportedLanguages };
