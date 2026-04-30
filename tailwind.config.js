/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ocean: { 900: '#0A0E1A', 800: '#121D2E', 700: '#161F33' },
        accent: { DEFAULT: '#4073F2', hover: '#5A8AFF' },
        txt: { DEFAULT: '#F0F4FC', dim: '#8B95A8' },
      },
    },
  },
  plugins: [],
}
