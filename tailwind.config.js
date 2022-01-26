module.exports = {
  purge: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
    "./sections/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "media",
  theme: {
    extend: {
      colors: {
        white: "#ffffff",
        primary: "#b25070",
        secondary: "#BEA352",
        tertiary: "#002147",
        quaternary: "#151515",
        quinary: "#ffffff",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
