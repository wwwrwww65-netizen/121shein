import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    '../../apps/web/src/**/*.{js,ts,jsx,tsx}',
    '../../apps/mobile/src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF3E6C', // A vibrant pink, similar to fashion e-commerce brands
        secondary: '#F5F5F6', // A light grey for backgrounds
        accent: '#FFD700', // A gold accent for sales and promotions
      },
      fontFamily: {
        sans: ['"Tajawal"', 'sans-serif'], // A modern Arabic font
      },
    },
  },
  plugins: [],
};

export default config;
