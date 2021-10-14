module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        "main-font": ["Ubuntu", "sans-serif"],
        "sub-font": ["Gemunu Libre", "sans-serif"],
        "light-font": ["Open Sans", "sans-serif"],
      },
      colors: {
        light: {
          //Light Mode
          primary: "#1d3171",
          primary2: "#142860",
          secondary: "#ffffff",
        },
        dark: {
          //Dark Mode
          primary: "#1d3171",
          secondary: "#293145",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
