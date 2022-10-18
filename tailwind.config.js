module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#5eead4',
          DEFAULT: '#14b8a6',
          dark: '#0f766e',
        },
        secondary: {
          light: '#bae6fd',
          DEFAULT: '#0ea5e9',
          dark: '#0369a1',
        },
        white: '#ffffff',
        black: '#000000',
      },
    },
  },
  darkMode: ['class', '.ns-dark'],
  plugins: [],
  corePlugins: {
    preflight: false // disables browser-specific resets
  }
};
