/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'chatgpt-dark': '#202123',
        'chatgpt-light': '#343541',
        'chatgpt-hover': '#2a2b32',
        'chatgpt-border': '#4d4d4f',
        'chatgpt-accent': '#10a37f',
      },
    },
  },
  plugins: [],
}
