module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        boogaloo: ['"Boogaloo"', 'sans-serif'], 
        inder: ['"Inder"', 'sans-serif'], 
        poetsen: ['"Poetsen One"', 'sans-serif'], 
        sulphur: ['"Sulphur Point"', 'sans-serif'],
      },
      keyframes: {
        typewriter: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        bubble: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-30px)" },
        },
        modalIn: {
          '0%': { opacity: '0', transform: 'translateY(-40px) scale(0.95)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
      },
      animation: {
        bubble: "bubble 6s ease-in-out infinite",
        "bubble-slow": "bubble 10s ease-in-out infinite",
        modalIn: "modalIn 0.35s ease-out forwards",
      },
    },
  },
  plugins: [],
};
