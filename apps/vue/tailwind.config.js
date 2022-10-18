const base = require('../../tailwind.config');

const config = {
  ...base,
  content: [
    './app/**/*.{css,xml,html,vue,svelte,ts,tsx}'
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
