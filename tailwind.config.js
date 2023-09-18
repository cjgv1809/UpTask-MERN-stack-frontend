/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // colors: {
      //   background: "#F8F0E5",
      //   primary: "#0F2C59",
      //   secondary: "#DAC0A3",
      //   tertiary: "#EADBC8",
      //   accent: "#594545",
      // },
      fontFamily: {
        heading: ["Poppins", "sans-serif"],
        body: ["Barlow", "sans-serif"],
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["autumn"],
    base: true,
    utils: true,
    styled: true,
  },
};
