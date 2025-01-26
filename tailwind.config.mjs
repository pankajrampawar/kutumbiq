/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#5646E5",
        textAlt: "#017272",
        accentAqua: "#02D8D8",
        rustOrange: "#D46039",
        brightYellow: "#EDDD2B",
        softTeal: "#61B3B1"
      },
    },
  },
  plugins: [],
};
