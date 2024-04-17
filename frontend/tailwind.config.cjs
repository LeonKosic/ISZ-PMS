/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // 
        transparent: 'transparent',
        'primary': {
          100: '#573636',
          200: '#492a2a',
          300: '#432525',
          400: '#3d2020',
          500: '#371a1a',
          600: '#2e1313',
          700: '#260c0c',
          800: '#200a0a',
          900: '#180000',
          DEFAULT: '#180000'
        },
        'accent': {
          100: '#fafafa',
          200: '#e7e2e2',
          300: '#ccc2c2',
          400: '#b8a9a9',
          500: '#a49292',
          600: '#866d6d',
          700: '#694a4a',
          800: '#583535',
          900: '#492323',
          DEFAULT: '#e7e2e2'
        }
      },
      fontFamily: {}
    }
  },
  plugins: []
};