module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      transitionProperty: {
        'font-size': 'font-size',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
