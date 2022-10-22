const webpack = require("@nativescript/webpack");
const { resolve } = require('path');

module.exports = (env) => {
	webpack.init(env);

	// Learn how to customize:
	// https://docs.nativescript.org/webpack

  webpack.chainWebpack((config) => {
    config.resolve.alias.set(
      '@flavorful/ui/scss',
      resolve(__dirname, '../../libs/scss/src')
    );
    config.resolve.alias.set(
      '@flavorful/core',
      resolve(__dirname, '../../libs/ui/core/src')
    );
  });

	return webpack.resolveConfig();
};


