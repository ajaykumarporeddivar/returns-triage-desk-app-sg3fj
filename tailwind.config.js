/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'brand-primary': '#4F46E5', // Indigo 600
        'brand-accent': '#EC4899', // Pink 500
        'triage-pending': '#FBBF24', // Amber 400
        'triage-resolved': '#22C55E', // Green 500
        'triage-rejected': '#EF4444', // Red 500
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
}