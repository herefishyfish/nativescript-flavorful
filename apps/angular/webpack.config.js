const webpack = require('@nativescript/webpack');
const { resolve } = require('path');

module.exports = (env) => {
  webpack.init(env);
  webpack.useConfig('angular');

  webpack.chainWebpack((config) => {
    config.resolve.alias.set(
      '@flavorful/ui/scss',
      resolve(__dirname, '../../libs/scss/src')
    );
  });

  return webpack.resolveConfig();
};
