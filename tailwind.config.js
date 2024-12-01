/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'apple-gray': {
          50: '#f5f5f7',
          100: '#e5e5e7',
          200: '#d2d2d7',
          300: '#86868b',
          400: '#6e6e73',
          500: '#1d1d1f',
        },
        'apple-blue': '#0077ed',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'San Francisco', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'apple': '0 0 20px rgba(0, 0, 0, 0.05)',
        'apple-hover': '0 0 30px rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [],
}
