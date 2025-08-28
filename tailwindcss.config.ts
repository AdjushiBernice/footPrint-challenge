/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './src/**/*.{html,js,ts,jsx,tsx}',
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
      "./app/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
          fontFamily: {
            sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
            mono: ['var(--font-geist-mono)', 'monospace'], // keep mono if still needed
          },
        },
      },
    plugins: [],
  }
  