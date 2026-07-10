import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './lib/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: '#A38A4B',
        dark: '#050505',
        oliveDark: '#1E1B10',
        cream: '#F7F3EA',
        softCream: '#EFE7D7'
      },
      fontFamily: {
        heading: ['Tahoma', 'Arial', 'sans-serif'],
        body: ['Tahoma', 'Arial', 'sans-serif']
      },
      boxShadow: {
        luxury: '0 20px 55px rgba(0,0,0,0.22)'
      }
    }
  },
  plugins: []
};
export default config;
