/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'main-bg': "url('https://i.postimg.cc/N0sTG4LF/01.png')",
      }
    },
  },
  plugins: [],
};
