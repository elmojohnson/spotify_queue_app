/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#6366f1",
          secondary: "#ec4899",
          accent: "#38bdf8",
          neutral: "#4f46e5",
          "base-100": "#f1f5f9",
          "base-200": "#e2e8f0",
          "base-300": "#cbd5e1",
          success: "#4ade80",
          info: "#60a5fa",
          error: "#ef4444",
          warning: "#facc15",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
