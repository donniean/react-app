import path from 'node:path';

import { includeIgnoreFile } from '@eslint/compat';
import eslint from '@eslint/js';
import eslintPluginEslintCommentsConfigs from '@eslint-community/eslint-plugin-eslint-comments/configs';
import eslintPluginQuery from '@tanstack/eslint-plugin-query';
import eslintPluginVitest from '@vitest/eslint-plugin';
import { defineConfig, globalIgnores } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import eslintPluginI18next from 'eslint-plugin-i18next';
import * as eslintPluginImportX from 'eslint-plugin-import-x';
import eslintPluginJsxA11y from 'eslint-plugin-jsx-a11y';
import eslintPluginN from 'eslint-plugin-n';
import eslintPluginPromise from 'eslint-plugin-promise';
import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';
import eslintPluginReactRefresh from 'eslint-plugin-react-refresh';
import eslintPluginSimpleImportSort from 'eslint-plugin-simple-import-sort';
import eslintPluginSonarjs from 'eslint-plugin-sonarjs';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import eslintPluginUnusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import typescriptEslint from 'typescript-eslint';

const { dirname } = import.meta;
const gitignorePath = path.resolve(dirname, '.gitignore');

const nodeGlobs = [
  '**/.htmlvalidate.{js,mjs,cjs}',
  '**/.ncurc.{js,mjs,cjs}',
  '**/commitlint.config.{js,mjs,cjs,ts}',
  '**/cspell.config.{js,mjs,cjs,ts}',
  '**/eslint.config.{js,mjs,cjs,ts}',
  '**/html-validate.config.{js,mjs,cjs,ts}',
  '**/i18next.config.{js,mjs,cjs,ts}',
  '**/jest.config.{js,mjs,cjs,ts}',
  '**/lint-staged.config.{js,mjs,cjs,ts}',
  '**/prettier.config.{js,mjs,cjs,ts}',
  '**/rollup.config.{js,mjs,cjs,ts}',
  '**/stylelint.config.{js,mjs,cjs,ts}',
  '**/tsup.config.{js,mjs,cjs,ts}',
  '**/vite.config.{js,mjs,cjs,ts}',
  '**/vitest.config.{js,mjs,cjs,ts}',
  'config/**/*.{js,cjs,mjs,ts}',
  'scripts/**/*.{js,cjs,mjs,ts}',
];
const testGlobs = ['**/tests/**', '**/*.test.{js,jsx,ts,tsx}'];
const storyGlobs = [
  '**/*.stories.{js,jsx,ts,tsx}',
  '**/*.story.{js,jsx,ts,tsx}',
];
const devDependencyGlobs = [...nodeGlobs, ...testGlobs, ...storyGlobs];

function getImportSource(node) {
  return typeof node.source.value === 'string' ? node.source.value : undefined;
}

function isNamedTypeImport(node) {
  return (
    node.importKind === 'type' &&
    node.specifiers.length > 0 &&
    node.specifiers.every((specifier) => specifier.type === 'ImportSpecifier')
  );
}

function isMergeableValueImport(node) {
  return (
    node.importKind !== 'type' &&
    node.specifiers.length > 0 &&
    !node.specifiers.some(
      (specifier) => specifier.type === 'ImportNamespaceSpecifier',
    )
  );
}

function collectImportDeclarationsBySource(node) {
  const importsBySource = new Map();

  for (const statement of node.body) {
    if (statement.type !== 'ImportDeclaration') {
      continue;
    }

    const source = getImportSource(statement);

    if (!source) {
      continue;
    }

    const imports = importsBySource.get(source) ?? [];
    imports.push(statement);
    importsBySource.set(source, imports);
  }

  return importsBySource;
}

function getMergeableValueImport(imports) {
  for (const importDeclaration of imports) {
    if (isMergeableValueImport(importDeclaration)) {
      return importDeclaration;
    }
  }
}

const mergeTypeImportsRule = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Merge named type imports into existing value imports from the same source.',
    },
    fixable: 'code',
    schema: [],
    messages: {
      mergeTypeImport:
        "Merge this type import from '{{source}}' into the existing value import.",
    },
  },
  create(context) {
    const sourceCode = context.sourceCode;

    function removeImportDeclaration(fixer, node) {
      let end = node.range[1];

      if (sourceCode.text.slice(end, end + 2) === '\r\n') {
        end += 2;
      } else if (sourceCode.text[end] === '\n') {
        end += 1;
      }

      return fixer.removeRange([node.range[0], end]);
    }

    function insertIntoValueImport(fixer, node, typeSpecifiers) {
      let namedSpecifier;

      for (const specifier of node.specifiers) {
        if (specifier.type === 'ImportSpecifier') {
          namedSpecifier = specifier;
          break;
        }
      }

      if (namedSpecifier) {
        let openingBrace;

        for (const token of sourceCode.getTokens(node)) {
          if (token.value === '{') {
            openingBrace = token;
            break;
          }
        }

        return fixer.insertTextAfter(
          openingBrace,
          ` ${typeSpecifiers.join(', ')},`,
        );
      }

      return fixer.insertTextAfter(
        node.specifiers.at(-1),
        `, { ${typeSpecifiers.join(', ')} }`,
      );
    }

    return {
      Program(node) {
        const importsBySource = collectImportDeclarationsBySource(node);

        for (const [source, imports] of importsBySource) {
          const valueImport = getMergeableValueImport(imports);

          if (!valueImport) {
            continue;
          }

          for (const typeImport of imports) {
            if (!isNamedTypeImport(typeImport)) {
              continue;
            }

            context.report({
              node: typeImport,
              messageId: 'mergeTypeImport',
              data: {
                source,
              },
              fix(fixer) {
                const typeSpecifiers = typeImport.specifiers.map(
                  (specifier) => `type ${sourceCode.getText(specifier)}`,
                );

                return [
                  insertIntoValueImport(fixer, valueImport, typeSpecifiers),
                  removeImportDeclaration(fixer, typeImport),
                ];
              },
            });
          }
        }
      },
    };
  },
};
const eslintPluginLocal = {
  rules: {
    'merge-type-imports': mergeTypeImportsRule,
  },
};

export default defineConfig([
  includeIgnoreFile(gitignorePath, 'custom/gitignore'),
  globalIgnores(['**/*.min.*'], 'custom/ignore'),
  {
    name: 'custom/javascript/setup',
    languageOptions: {
      parser: typescriptEslint.parser,
      globals: {
        ...globals.es2025,
      },
    },
  },
  {
    name: 'custom/node/globals',
    files: ['**/*.cjs', ...nodeGlobs],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  {
    ...eslint.configs.recommended,
    name: 'eslint/recommended',
  },
  eslintPluginEslintCommentsConfigs.recommended,
  eslintPluginImportX.flatConfigs.recommended,
  eslintPluginPromise.configs['flat/recommended'],
  eslintPluginUnicorn.configs.recommended,
  eslintPluginSonarjs.configs.recommended,
  {
    name: 'custom/javascript/rules',
    rules: {
      'no-console': [
        process.env.NODE_ENV === 'development' ? 'warn' : 'error',
        { allow: ['warn', 'error'] },
      ],
      'no-param-reassign': [
        'error',
        {
          props: true,
          ignorePropertyModificationsFor: [
            'acc', // for reduce accumulators
            'accumulator', // for reduce accumulators
            'e', // for e.returnvalue
            'ctx', // for Koa routing
            'context', // for Koa routing
            'req', // for Express requests
            'request', // for Express requests
            'res', // for Express responses
            'response', // for Express responses
            '$scope', // for Angular 1 scopes
            'staticContext', // for ReactRouter context
            'draft', // for immer
          ],
        },
      ],
      'no-restricted-imports': [
        'error',
        {
          patterns: ['../..'],
        },
      ],
      'no-useless-call': 'error',
    },
  },
  {
    name: 'custom/import-x/rules',
    rules: {
      'import-x/first': 'error',
      'import-x/newline-after-import': 'error',
      'import-x/no-cycle': 'error',
      'import-x/no-duplicates': [
        'error',
        {
          considerQueryString: true,
        },
      ],
      'import-x/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: devDependencyGlobs,
          optionalDependencies: false,
          peerDependencies: true,
        },
      ],
      'import-x/order': [
        'error',
        {
          groups: [
            // 'type',
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling', 'index'],
            'object',
            'unknown',
          ],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            orderImportKind: 'asc',
          },
          named: true,
          warnOnUnassignedImports: true,
          // sortTypesGroup: true,
          // 'newlines-between-types': 'always',
        },
      ],
      'import-x/prefer-namespace-import': 'error',
    },
    settings: {
      'import-x/resolver-next': [eslintPluginImportX.createNodeResolver()],
    },
  },
  {
    name: 'custom/unicorn/rules',
    rules: {
      'unicorn/filename-case': [
        'error',
        {
          cases: {
            kebabCase: true,
            camelCase: false,
            pascalCase: false,
          },
        },
      ],
      'unicorn/no-null': 'off',
      'unicorn/prevent-abbreviations': 'off',
    },
  },
  {
    name: 'simple-import-sort',
    files: ['**/*.{mjs,ts,tsx}'],
    plugins: {
      'simple-import-sort': eslintPluginSimpleImportSort,
    },
    rules: {
      'sort-imports': 'off',
      'import-x/order': 'off',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  },
  {
    name: 'custom/typescript',
    files: ['**/*.{ts,tsx}'],
    extends: [
      typescriptEslint.configs.strictTypeChecked,
      typescriptEslint.configs.stylisticTypeChecked,
      eslintPluginImportX.flatConfigs.typescript,
    ],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      local: eslintPluginLocal,
    },
    settings: {
      'import-x/resolver-next': [
        createTypeScriptImportResolver({ alwaysTryTypes: true }),
      ],
    },
    rules: {
      '@typescript-eslint/consistent-type-exports': [
        'error',
        {
          fixMixedExportsWithInlineTypeSpecifier: true,
        },
      ],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          fixStyle: 'inline-type-imports',
        },
      ],
      '@typescript-eslint/member-ordering': 'error',
      '@typescript-eslint/no-import-type-side-effects': 'error',
      'local/merge-type-imports': 'error',
    },
  },
  {
    name: 'unused-imports',
    plugins: {
      'unused-imports': eslintPluginUnusedImports,
    },
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'error',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
    },
  },
  {
    name: 'custom/react',
    files: ['src/**'],
    extends: [
      eslintPluginReact.configs.flat.recommended,
      eslintPluginReact.configs.flat['jsx-runtime'],
      eslintPluginReactHooks.configs.flat['recommended-latest'],
      eslintPluginJsxA11y.flatConfigs.recommended,
      eslintPluginReactRefresh.configs.vite,
      eslintPluginQuery.configs['flat/recommended'],
      /**
       * dependencies @next/eslint-plugin-next
       */
      /* https://nextjs.org/docs/app/building-your-application/configuring/eslint#migrating-existing-config */
      // 'plugin:@next/next/recommended',
      // 'plugin:@next/next/core-web-vitals',
    ],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.devtools,
      },
    },
    rules: {
      'react/jsx-sort-props': [
        'error',
        {
          callbacksLast: true,
          shorthandFirst: true,
          multiline: 'last',
          reservedFirst: true,
        },
      ],
      'react/require-default-props': [
        'error',
        {
          forbidDefaultForRequired: true,
          functions: 'defaultArguments',
        },
      ],
      'react/sort-comp': 'error',
      'react/sort-default-props': 'error',
      'react/sort-prop-types': [
        'error',
        {
          callbacksLast: true,
          requiredFirst: true,
          sortShapeProp: true,
          checkTypes: true,
        },
      ],
    },
  },
  {
    name: 'i18next/recommended',
    files: ['src/**'],
    ignores: ['**/tests/**', '**/*.test.*', '**/mocks/**', '**/*.mock.*'],
    extends: [eslintPluginI18next.configs['flat/recommended']],
  },
  {
    name: 'custom/node',
    files: ['server/**'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    extends: [eslintPluginN.configs['flat/recommended']],
    rules: {
      'n/no-missing-import': [
        'off',
        {
          ignoreTypeImport: true,
        },
      ],
    },
  },
  {
    files: testGlobs,
    ...eslintPluginVitest.configs.recommended,
  },
  eslintConfigPrettier,
]);
