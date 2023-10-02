/* eslint-disable import/no-anonymous-default-export */
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-dark': '#100919',

        secondary: '#d6d0e0',
        tertiary: '#403054',
        'accent-50': '#f6f2ff',
        'accent-100': '#e7d4fe',
        'accent-300': '#b16afb',
        'accent-400': '#a958fa',
        'border-hover': '#8c20f8',
        'border-color': '#7e12ff',
        outline: '#1f0f48',
        'form-field-background': '#f8f8f8',
        'form-field': 'rgba(31, 15, 72, 0.5)',
        danger: '#ea384c',
      },
    },
  },
  plugins: [],
};
