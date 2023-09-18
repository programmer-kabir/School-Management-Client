/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'da22ff': '#da22ff',
        'd211f8': '#d211f8',
        'c801f0': '#c801f0',
        'b400d8': '#b400d8',
      },
    },
  },
  plugins: [],
}

