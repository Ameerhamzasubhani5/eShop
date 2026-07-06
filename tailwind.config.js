/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}', // For App Router
    './pages/**/*.{js,ts,jsx,tsx}', // For Pages Router
    './components/**/*.{js,ts,jsx,tsx}', // For components
  ],
  theme: {
    extend: {
      colors: {
        gray: '#F0F0F0',
        primary: '#1E40AF', // Custom primary color
        secondary: '#10B981', // Custom secondary color
        accent: {
          100: '#FEE2E2', // Light shade
          500: '#EF4444', // Medium shade
          900: '#991B1B', // Dark shade
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Custom default font
        custom: ['CustomFont', 'sans-serif'], // Additional custom font
      },
    },
  },
  plugins: [],
};