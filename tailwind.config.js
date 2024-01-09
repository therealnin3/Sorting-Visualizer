/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      transitionProperty: {
        height: "height",
      },
      colors: {
        primary: {
          100: "#6670F8",
          200: "#02063B",
        },
        base: {
          100: "#FFFFFF",
          200: "#FCFCFC",
          300: "#E2E2E2",
          400: "#bfbfbf",
        },
      },
    },
  },
  plugins: [],
};

// amount of divs
// speed of solve
// color of divs
// buttons for different algorithms
// buttons for different sorted arrays
// min and max vales
// allow same values
