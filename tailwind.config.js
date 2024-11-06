/** @type {import('tailwindcss').Config} */
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
        'brandnew': "url('/src/assets/image/brandnew.jpg')",
        'kids': "url('/src/assets/image/kids-shirt.png')",
        'training-equipment': "url('/src/assets/image/training-equipment.jpg')",
        'vintage': "url('/src/assets/image/vintage-shirt.png')",
        'hero': "url('/src/assets/image/hero.webp')",
      }
    },
  },
  plugins: [require("daisyui")],
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

