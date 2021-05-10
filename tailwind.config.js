module.exports = {
  purge: {
    content: ['./src/**/*.js'],
    enabled: true,
    options: {
      safelist: ['dark'],
    },
  },
  darkMode: 'class',
  theme: {
    typography: (theme) => ({}),
    extend: {
      typography: (theme) => ({
        dark: {
          css: {
            color: 'white',
          },
        },
      }),
    },
    fontFamily: {
      heads: ['Montserrat', 'sans-serif'],
      body: ['Merriweather', 'serif'],
    },
    textColor: {
      tomato: '#DE541E',
      mwhite: '#FEFFFE',
      mgrey: '#CDD3D5',
    },
  },
  variants: {
    typography: ['dark'],
  },
  plugins: [require('@tailwindcss/typography')],
};
