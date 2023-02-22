/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
const svgToDataUri = require('mini-svg-data-uri')
const { default: flattenColorPalette } = require('tailwindcss/lib/util/flattenColorPalette')
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: {
          50: "#e5f2ff",
          100: "#c1deff",
          200: "#9acaff",
          300: "#74b5ff",
          400: "#5da4ff",
          500: "#5095ff",
          600: "#4f86f4",
          700: "#4c73df",
          800: "#4862cc",
          900: "#4241ac",
        },
        secondary: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#5A657D',
          700: '#4A5568',
          800: '#262626',
          900: '#171717',
        },
        purple: {
          50: "#f0e7fe",
          100: "#d6c4fc",
          200: "#ba9dfa",
          300: "#9b73fa",
          400: "#8251f8",
          500: "#6732ed",
          600: "#5a2de7",
          700: "#4824de",
          800: "#331fd6",
          900: "#0012c7",
        },
        blue: '#2129EE',
        sky: '#0590DE',
        night: '#2E5C9E',
        green: '#70a334',
        orange: '#F59C1C',
        red: '#dc3545',
        yellow: '#FDAF17',
      }
    },
  },
  plugins: [
    function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'bg-grid': (value) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
            )}")`,
          }),
        },
        { values: flattenColorPalette(theme('backgroundColor')), type: 'color' }
      )

      matchUtilities(
        {
          highlight: (value) => ({ boxShadow: `inset 0 1px 0 0 ${value}` }),
        },
        { values: flattenColorPalette(theme('backgroundColor')), type: 'color' }
      )
    },
    require('@tailwindcss/line-clamp'),
    require('tailwind-scrollbar'),
  ],
}