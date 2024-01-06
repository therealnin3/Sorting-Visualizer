/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      transitionProperty: {
        height: "height",
      },
      colors: {
        primary: "#ff6363",
        base: {
          100: "#fcfcfc",
          200: "d9d9d9",
        },
      },
    },
  },
  plugins: [],
};
