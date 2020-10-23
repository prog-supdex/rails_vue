process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const environment = require('./environment');
const eslint = require('./loaders/eslint_plugin');

environment.plugins.prepend('EslintWebpackPlugin', eslint);

module.exports = environment.toWebpackConfig();
