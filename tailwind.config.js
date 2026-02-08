/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
theme: {
  extend: {
    fontSize: {
      base: "1rem",
      lg: "1.05rem",
    },
  },
},

  plugins: [],
};
