/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      title: "Orbitron, sans-serif",
      text: "Roboto Condensed, sans-serif",
    },
    colors: {
      bg: {
        primary: "var(--bg-primary)",
        secondary: "var(--bg-secondary)",
      },
      bg_opacity: {
        primary: "var(--bg-primary-opacity)",
        secondary: "var(--bg-secondary-opacity)",
      },
      text: {
        primary: "var(--text-primary)",
        secondary: "var(--text-secondary)",
      },
      accent: {
        primary: "var(--accent-primary)",
        secondary: "var(--accent-secondary)",
        primaryhover: "var(--accent-primary-hover)",
      },
    },
    extend: {
      boxShadow: {
        primary: "var(--shadow)",
      },
    },
  },
  plugins: [],
};
