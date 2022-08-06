const { translate } = require('tailwindcss/defaultTheme');
const defaultTheme = require('tailwindcss/defaultTheme')

const COLORS = {
  orange: '#FF9F00',
  orangeDark: '#E08A00',
  white: '#FCF7F8',
  black: '#151516',
  blueDark: '#040b24',

};

module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'black': COLORS.black,
      'white': COLORS.white,
      'orange': COLORS.orange,
      'orange-dark': COLORS.orangeDark,
      'blue-dark': COLORS.blueDark
    },
    extend: {
      fontFamily: {
        'sans': ['VCR', ...defaultTheme.fontFamily.sans],
        'cooper': ['Cooper', 'VCR', ...defaultTheme.fontFamily.sans]
      },
      dropShadow: {
        'logo': [`0 0 0.25em ${COLORS.orange}`],
        'icon': [`0 0 0.4em ${COLORS.white}`],
        'icon-orange': [`0 0 0.4em ${COLORS.orange}`],
      },
      blur: {
        '2xs': '1px',
        xs: '2px'
      },
      transitionProperty: {
        'svg': 'fill, stroke, dropShadow'
      },
      backgroundImage: {
        'tv': ['linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%)', 'linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))'],
        'grain': `url('/grain.png')`,
      },
      backgroundSize: {
        'tv': [ '100% 2px', '3px 100%' ]
      },
      width: {
        'full-x2': '200vw'
      },
      height: {
        'full-x2': '200vh'
      },
      gridTemplateRows: {
        'layout': '1fr 5rem'
      },
      animation: {
        flicker: 'flicker 0.15s infinite',
        'svg-glitch': 'svg-glitch 6s infinite',
        grain: 'grain 1.5s steps(6) infinite'
      },
      keyframes: {
        flicker: {
          '0%': { opacity: 0.27861 },
          '5%': { opacity: 0.34769 },
          '10%': { opacity: 0.23604 },
          '15%': { opacity: 0.90626 },
          '20%': { opacity: 0.18128 },
          '25%': { opacity: 0.83891 },
          '30%': { opacity: 0.65583 },
          '35%': { opacity: 0.67807 },
          '40%': { opacity: 0.26559 },
          '45%': { opacity: 0.84693 },
          '50%': { opacity: 0.96019 },
          '55%': { opacity: 0.08594 },
          '60%': { opacity: 0.20313 },
          '65%': { opacity: 0.71988 },
          '70%': { opacity: 0.53455 },
          '75%': { opacity: 0.37288 },
          '80%': { opacity: 0.71428 },
          '85%': { opacity: 0.70419 },
          '90%': { opacity: 0.7003 },
          '95%': { opacity: 0.36108 },
          '100%': { opacity: 0.24387 }
        },
        'svg-glitch': {
            '0%': { filter: `drop-shadow(0 0 0.25em ${COLORS.orange}) drop-shadow(0 0 0.05em ${COLORS.orange})` },
            '40%': { filter: `drop-shadow(0 0 0.25em ${COLORS.orange}) drop-shadow(0 0 0.1em ${COLORS.orange})` },
            '45%': { filter: `drop-shadow(0 0 0.25em ${COLORS.orange}) drop-shadow(0 0 0.1em ${COLORS.orange}) drop-shadow(-0.5em -0.25em 0.025em rgba(255, 0, 0, 0.75)) drop-shadow(0.5em 0.5em 0.025em rgba(0, 255, 0, 0.75)) drop-shadow(-0.5em -0.5em 0.025em rgba(0, 0, 255, 0.75))` },
            '50%': { filter: `drop-shadow(0 0 0.25em ${COLORS.orange}) drop-shadow(0 0 0.1em ${COLORS.orange}) drop-shadow(0.25em 0.5em 0.025em rgba(255, 0, 0, 0.75)) drop-shadow(0.5em 0 0.025em rgba(0, 255, 0, 0.75)) drop-shadow(0.0 -0.1em 0.025em rgba(0, 0, 255, 0.75))` },
            '55%': { filter: `drop-shadow(0 0 0.25em ${COLORS.orange}) drop-shadow(0 0 0.1em ${COLORS.orange}) drop-shadow(0.1em 0 0.025em rgba(255, 0, 0, 0.75)) drop-shadow(-0.5em -0.75em 0.025em rgba(0, 255, 0, 0.75)) drop-shadow(0.5em 0.75em 0.025em rgba(0, 0, 255, 0.75))` },
            '60%': { filter: `drop-shadow(0 0 0.25em ${COLORS.orange}) drop-shadow(0 0 0.1em ${COLORS.orange})` },
            '100%': { filter: `drop-shadow(0 0 0.25em ${COLORS.orange}) drop-shadow(0 0 0.1em ${COLORS.orange})` }
        },
        grain: {
          '0%': { transform: 'translate(0,0)' },
          '20%': { transform: 'translate(5%,-5%)' },
          '40%': { transform: 'translate(-3%,-1%)' },
          '60%': { transform: 'translate(6%,4%)' },
          '80%': { transform: 'translate(-2%,1%)' },
          '100%': { transform: 'translate(0,0)' },
        },
      }
    },
  },
  plugins: [],
}
