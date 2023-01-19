/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./components/**/*.{js,ts,jsx,tsx}', './app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        white: '#ffffff',

        shadow: {
          600: 'rgba(0, 0, 0, 0.6)',
        },

        gray: {
          900: '#121214',
          800: '#202024',
          300: '#c4c4cc',
          100: '#e1e1e6',
        },

        green: {
          500: '#00875f',
          300: '#00b37e',
        },
      },

      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },

      fontSize: {
        sm: '0.875rem',
        md: '1.125rem',
        lg: '1.25rem',
        xl: '1.5rem',
        '2xl': '2rem',
      },
    },
  },
  plugins: [],
}
