/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#303F9F", // azul principal
          light: "#448AFF",
          dark: "#1e40af",
          button: "#212121",
        },
        secondary: {
          DEFAULT: "#f1f5f9", // gris claro
          dark: "#64748b",
        },
        accent: "#f59e42", // naranja/acento
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        display: ["Poppins", "ui-sans-serif", "system-ui"],
      },
      borderRadius: {
        xl: "1rem",
      },
    },
    screens: {
      xs: "375px", // Móviles pequeños
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
  plugins: [],
};
