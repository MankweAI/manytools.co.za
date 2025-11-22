/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // No new colors needed here, we will use Tailwind's default palette (emerald, zinc)
      animation: {
        "fade-in-out": "fade-in-out 3s ease-in-out forwards",
      },
      keyframes: {
        "fade-in-out": {
          "0%, 100%": { opacity: "0", transform: "translateY(-20px)" },
          "10%, 90%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
