/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
      minWidth: {
        xss: "120px",
        xs: "300px",
        sm: "600px",
      },
      extend: {
        colors: {
          "blue-gray": "#E2E8F0",
          navy: "#455CCE",
          "top-nav": "#F5FAFF",
          accent: "#2E4F94",
          dark: "#2d2d39",
          "soft-dark": "#22303C",
          "softer-dark": "#2E3A48",
          modal: "rgba(0,0,0,0.6)",
        },
        zIndex: {
          1000: "1000",
          100: "100",
          99: "99",
          90: "90",
          80: "80",
          70: "70",
          60: "60",
        },
      },
    },
    plugins: [],
  };
  