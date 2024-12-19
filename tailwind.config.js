/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary':'#C9080E',
        'secondary':'#B0B06C',
        'third':'#414042',
        'white': '#FFFFFF',
        'black': '#1A1A1A',
        'hover-primary':'#9d060b',
        'hover-white':'#f0f0f0',
      },
      backgroundImage: {
        'brandnew': "url('/src/assets/image/bg-brandnew.webp')",
        'kids': "url('/src/assets/image/bg-kids.webp')",
        'training-equipment': "url('/src/assets/image/bg-training.webp')",
        'vintage': "url('/src/assets/image/bg-vintage.webp')",
        'hero': "url('/src/assets/image/bg-hero.webp')",
      }
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [],
    darkTheme: "dark",
    base: true,
    styled: true,
    utils: true, 
    prefix: "", 
    logs: true,
    themeRoot: ":root",
  },
}

