import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        garage: {
          bg:       "#08090a",
          surface:  "#111214",
          card:     "#17191c",
          border:   "#232529",
          muted:    "#3a3d42",
          accent:   "#c9a84c",       // premium gold
          accent2:  "#e85d1e",       // sportive orange
          text:     "#f0f2f5",
          sub:      "#8b8f98",
        },
      },
      fontFamily: {
        sans:  ["Inter", "system-ui", "sans-serif"],
        display: ["'DM Sans'", "Inter", "sans-serif"],
      },
      backgroundImage: {
        "radial-garage": "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(201,168,76,0.15), transparent)",
      },
      animation: {
        "aurora":        "aurora 60s linear infinite",
        "fade-in":       "fadeIn 0.6s ease forwards",
        "slide-up":      "slideUp 0.5s ease forwards",
        "pulse-slow":    "pulse 4s cubic-bezier(0.4,0,0.6,1) infinite",
      },
      keyframes: {
        aurora: {
          from: { backgroundPosition: "50% 50%, 50% 50%" },
          to:   { backgroundPosition: "350% 50%, 350% 50%" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to:   { opacity: "1" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [addVariablesForColors],
};

// Expose all Tailwind colors as CSS custom properties (required by Aceternity Aurora)
function addVariablesForColors({ addBase, theme }) {
  const allColors = flattenColorPalette(theme("colors"));
  const newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );
  addBase({ ":root": newVars });
}
