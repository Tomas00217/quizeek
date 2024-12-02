import react from 'eslint-plugin-react';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import unusedImports from 'eslint-plugin-unused-imports';
import prettier from 'eslint-plugin-prettier';
import preferArrowFunctions from 'eslint-plugin-prefer-arrow-functions';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: [
      'src/components/ui/**/*',
      '.next/**/*',
      '**/tailwind.config.ts',
      '**/eslint.config.mjs',
      '**/postcss.config.mjs',
    ],
  },
  ...compat.extends(
    'next/core-web-vitals',
    'next/typescript',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:cypress/recommended'
  ),
  {
    plugins: {
      react,
      '@typescript-eslint': typescriptEslint,
      'unused-imports': unusedImports,
      prettier,
      'prefer-arrow-functions': preferArrowFunctions,
    },

    languageOptions: {
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',

      parserOptions: {
        project: 'tsconfig.json',
      },
    },

    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/no-floating-promises': 'error',
      'unused-imports/no-unused-imports': 'error',
      'no-await-in-loop': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      'no-param-reassign': 'warn',
      'lines-between-class-members': 'error',
      'no-trailing-spaces': 'warn',

      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: ',^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],

      'prefer-arrow-functions/prefer-arrow-functions': [
        'warn',
        {
          classPropertiesAllowed: false,
          disallowPrototype: false,
          returnStyle: 'explicit',
          singleReturnOnly: false,
        },
      ],

      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/no-non-null-assertion': 'error',
    },
  },
];