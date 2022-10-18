const base = require('../../tailwind.config');

const config = {
  ...base,
  content: [
    './app/**/*.{css,scss,svelte}'
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
