/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./src/**/*.{html,js,svelte,ts}",
    "./node_modules/flowbite/**/*.js",
  ],

  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        red: "FF0000",
        sred: "#991b1b",
        maroon: "950101",
        brown: "3D0000",
        black: "000000",
      },

      fontFamily: {
        poppins: ["Poppins, sans-serif"],
        "bebas-neue": ["Bebas Neue, sans-serif"],
        roboto: ["Roboto, sans-serif"],
        inter: ["Inter, sans-serif"],
      },
    },
  },

  //   plugins: [require("flowbite/plugin")],
};
