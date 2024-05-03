/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require("@spartan-ng/ui-core/hlm-tailwind-preset")],
  content: ["./src/**/*.{html,ts}"],
  darkMode: "selector",
  theme: {
    extend: {
      colors: {
        dark: {
          "01": "#322F2F",
        },
      },
    },
  },
  plugins: [],
};
