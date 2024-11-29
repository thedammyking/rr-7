import pluginJs from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import configPrettier from 'eslint-config-prettier';
import importX from 'eslint-plugin-import-x';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import tsEslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
  // Ignore
  {
    ignores: ['build', 'node_modules', '.netlify', '.react-router', 'public']
  },

  // Default
  {
    files: ['**/*.{js,mjs,cjs,jsx,ts,tsx}'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      ecmaVersion: 'latest',
      sourceType: 'module'
    }
  },

  // JavaScript
  pluginJs.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs}'],
    rules: {
      'no-console': 'warn',
      'array-callback-return': 'error',
      'consistent-return': 'off',
      'no-await-in-loop': 'error',
      'no-constructor-return': 'error',
      'no-duplicate-imports': 'error',
      'no-promise-executor-return': 'error',
      'no-self-compare': 'error',
      'no-unmodified-loop-condition': 'error',
      'no-use-before-define': 'error',
      'no-useless-assignment': 'error',
      'block-scoped-var': 'error',
      yoda: 'error',
      'prefer-promise-reject-errors': 'warn',
      'prefer-template': 'warn'
    }
  },

  // TypeScript
  ...tsEslint.configs.recommended,
  {
    files: ['**/*.{ts,jsx,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json'
      }
    },
    rules: {
      '@typescript-eslint/consistent-type-imports': ['warn', { prefer: 'type-imports' }],
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/no-explicit-any': 'error'
    }
  },

  // React
  react.configs.flat.recommended,
  react.configs.flat['jsx-runtime'],
  {
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        ...globals.browser
      }
    },
    rules: {
      'react/button-has-type': 'error',
      'react/display-name': 'off',
      'react/forbid-prop-types': 'off',
      'react/jsx-closing-tag-location': 'error',
      'react/jsx-filename-extension': [
        'error',
        { extensions: ['.jsx', '.tsx'], ignoreFilesWithoutCode: true }
      ],
      'react/no-multi-comp': 'error',
      'react/prefer-stateless-function': 'error',
      'react/prop-types': 'off',
      'react/jsx-no-leaked-render': 'error',
      'react/jsx-no-script-url': 'error',
      'react/jsx-pascal-case': [
        'error',
        { allowAllCaps: false, allowNamespace: true, allowLeadingUnderscore: false }
      ],
      'react/no-unstable-nested-components': 'error',
      'react/no-array-index-key': 'error',
      'react/jsx-no-useless-fragment': 'error',
      'react/jsx-props-no-spread-multi': 'error',
      'react/style-prop-object': 'error'
    },
    settings: {
      react: {
        version: 'detect'
      }
    }
  },

  // React Hooks
  {
    plugins: {
      'react-hooks': reactHooks
    },
    rules: {
      'react-hooks/exhaustive-deps': 'warn'
    }
  },

  // JSX A11y
  jsxA11y.flatConfigs.recommended,

  // Simple Import Sort
  {
    plugins: {
      'simple-import-sort': simpleImportSort
    },
    rules: {
      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // Packages `react` related packages come first.
            ['^react', '^@?\\w'],
            // Side effect imports.
            ['^\\u0000'],
            // Node.js builtins prefixed with `node:`.
            ['^node:'],
            // Packages.
            // Things that start with a letter (or digit or underscore), or `@` followed by a letter.
            ['^@?\\w'],
            // Internal packages with `@`, `~`, `#` alias.
            ['^(@|~|#)(/.*|$)'],
            // Anything not matched in another group.
            ['^'],
            // Parent imports. Put `..` last.
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            // Other relative imports. Put same-folder imports and `.` last.
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
            // Style imports.
            ['^.+\\.?(css|scss|less|styl|sass)$']
          ]
        }
      ]
    }
  },

  // Unused Imports
  {
    plugins: {
      'unused-imports': unusedImports
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
          caughtErrorsIgnorePattern: '^_'
        }
      ]
    }
  },

  // Import
  importX.flatConfigs.recommended,
  importX.flatConfigs.typescript,
  {
    rules: {
      'import-x/default': 'off',
      'import-x/extensions': 'off',
      'import-x/no-anonymous-default-export': 'off',
      'import-x/no-extraneous-dependencies': 'error',
      'import-x/no-unresolved': 'off',
      'import-x/no-mutable-exports': 'error',
      'import-x/first': 'error',
      'import-x/newline-after-import': 'error',
      'import-x/no-duplicates': 'error',
      'import-x/no-named-as-default-member': 'off'
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json'
        }
      }
    }
  },

  // Prettier
  configPrettier
];
