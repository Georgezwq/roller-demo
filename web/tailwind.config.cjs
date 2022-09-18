/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "paper-50": "rgba(57, 41, 40, 0.05)",
        "paper-500": "rgba(57, 41, 40, 0.5)",
        "paper-750": "rgba(57, 41, 40, 0.75)",
        "paper-1000": "rgba(57, 41, 40)",
      },
    },
  },
  plugins: [],
};
