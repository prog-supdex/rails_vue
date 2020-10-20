const { environment } = require('@rails/webpacker');
const { VueLoaderPlugin } = require('vue-loader');
const dotenv = require('dotenv');
// eslint-disable-next-line import/no-extraneous-dependencies
const webpack = require('webpack');
const vue = require('./loaders/vue');
const pug = require('./loaders/pug');
const sass = require('./loaders/sass');

environment.plugins.prepend('VueLoaderPlugin', new VueLoaderPlugin());
environment.loaders.prepend('vue', vue);
environment.loaders.prepend('pug', pug);
environment.loaders.prepend('sass', sass);

const dotenvFiles = [
  `.env.${process.env.NODE_ENV}.local`,
  '.env.local',
  `.env.${process.env.NODE_ENV}`,
  '.env',
];
dotenvFiles.forEach((dotenvFile) => {
  dotenv.config({ path: dotenvFile, silent: true });
});

environment.plugins.insert(
  'Environment',
  new webpack.EnvironmentPlugin(process.env),
);

module.exports = environment;
