/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        green: {
          DEFAULT: '#8DC31E',
          dark:    '#2D6A1F',
          light:   '#B5D95A',
          pale:    '#F2F9E5',
        },
        red: {
          DEFAULT: '#D4191A',
          dark:    '#A01010',
        },
      },
      fontFamily: {
        heading: ['Sora', 'Segoe UI', 'sans-serif'],
        body:    ['Inter', 'Segoe UI', 'sans-serif'],
      },
      boxShadow: {
        card:  '0 4px 20px rgba(45,106,31,0.12)',
        xl2:   '0 16px 60px rgba(45,106,31,0.20)',
        green: '0 4px 16px rgba(141,195,30,0.35)',
        red:   '0 4px 16px rgba(212,25,26,0.30)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
}