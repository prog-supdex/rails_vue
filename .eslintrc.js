module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: [
    'plugin:vue/essential',
    'airbnb-base',
  ],
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'vue',
  ],
  rules: {
    'no-console': 0,
    'import/extensions': ['error', 'always', {
      js: 'never',
      vue: 'never',
    }],
    'max-len': [2, { code: 120 }],
  },
};
