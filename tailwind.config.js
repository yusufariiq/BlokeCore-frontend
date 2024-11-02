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
      },
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

