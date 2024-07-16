/** @type {import('tailwindcss').Config} */
import { tailwindColors } from './tailwindColors';

export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ...tailwindColors,
      }
    },
  },
  plugins: [],
}

