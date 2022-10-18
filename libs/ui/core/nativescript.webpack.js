const { resolve } = require('path');

module.exports = (webpack) => {
  webpack.chainWebpack((config) => {
    // Fix and patch imports
    const nodeModulesPath = webpack.Utils.project.getProjectFilePath('node_modules');

    console.log('?????????????');

    config.resolve.alias = {
      ...config.resolve.alias,
      '@flavorful/ui/scss': resolve(
        __dirname,
        '../../libs/ui/scss/src'
      ),
    };


  });
};
