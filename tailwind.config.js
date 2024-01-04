/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  presets: [require('@spartan-ng/ui-core/hlm-tailwind-preset')],
  content: [
    "./src/**/*.{html,ts}",
    "./ui/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

