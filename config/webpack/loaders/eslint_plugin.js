const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = new ESLintPlugin({ extensions: ['js', 'vue'], files: 'app/javascript' });
