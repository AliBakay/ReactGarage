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
          bg:       "#0a192f",       // Deep blue (hero, footer, navbar)
          surface:  "#f8fafc",       // Light grey (inventory, about sections)
          card:     "#ffffff",       // White cards
          border:   "#e2e8f0",       // Light borders on white sections
          muted:    "#94a3b8",       // Muted text
          accent:   "#ff4d4d",       // Primary red
          accent2:  "#ff7676",       // Lighter red
          text:     "#ffffff",       // White text (on dark bg)
          sub:      "#94a3b8",       // Subdued (on dark bg)
          dark:     "#1e293b",       // Dark text (on light bg)
          darkSub:  "#64748b",       // Dark subdued text (on light bg)
        },
      },
      fontFamily: {
        sans:    ["Inter", "system-ui", "sans-serif"],
        display: ["'DM Sans'", "Inter", "sans-serif"],
      },
      backgroundImage: {
        "radial-garage": "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(255,77,77,0.15), transparent)",
        "hero-gradient": "linear-gradient(135deg, #0a192f 0%, #112240 50%, #0a192f 100%)",
      },
      animation: {
        "aurora":      "aurora 60s linear infinite",
        "fade-in":     "fadeIn 0.6s ease forwards",
        "slide-up":    "slideUp 0.5s ease forwards",
        "pulse-slow":  "pulse 4s cubic-bezier(0.4,0,0.6,1) infinite",
        "float":       "float 6s ease-in-out infinite",
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
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-10px)" },
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
