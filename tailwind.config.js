module.exports = {
  purge: ['./src/**/*.js'],
  darkMode: 'class',
  theme: {
    typography: (theme) => ({}),
    extend: {},
    fontFamily: {
      heads: ['Montserrat', 'sans-serif'],
      body: ['Merriweather', 'serif'],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
};
