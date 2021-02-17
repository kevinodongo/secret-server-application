module.exports = {
    env: {
      commonjs: true,
      es2021: true,
      node: true,
      jest: true
    },
    extends: ['airbnb-base', 'prettier'],
    parserOptions: {
      ecmaVersion: 12,
      sourceType: 'module',
    },
    rules: {
       'prettier/prettier': '0',
    },
    plugins: ['prettier'],
    overrides: [
      {
        files: [
          '**/__tests__/*.{j,t}s?(x)',
          '**/__tests__/**/*.spec.{j,t}s?(x)',
        ],
        env: {
          jest: true,
        },
      },
    ],
  };
  