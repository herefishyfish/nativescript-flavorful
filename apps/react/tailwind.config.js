const base = require('../../tailwind.config');

const config = {
  ...base,
  content: [
    './src/**/*.{css,tsx}'
  ],
  theme: {
    ...base.theme,
    extend: {
      ...base.theme.extend,
    },
  },
  plugins: [
    ...base.plugins
  ],
};

module.exports = config;
