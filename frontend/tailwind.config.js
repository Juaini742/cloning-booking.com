/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: "Roboto",
      },
      colors: {
        primary: "#003B95",
        secondary: "#006CE4",
        yellow: "#FFB700",
      },
    },
  },
  plugins: [],
};
