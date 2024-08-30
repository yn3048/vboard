/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: ['plugin:vue/vue3-essential', 'eslint:recommended', '@vue/eslint-config-prettier'],
  env: {
    'vue/setup-compiler-macros': true,
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        singleQuote: true,
        semi: true,
        tabWidth: 2,
        trailingComma: 'all',
        printWidth: 80,
        bracketSpacing: true,
        arrowParens: 'avoid',
        endOfLine: 'auto', // 한줄 추가
        parser: 'flow',
        usePrettierrc: false,
      },
    ],
  },
};
