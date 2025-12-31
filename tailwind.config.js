/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        inazuma: {
          blue: '#00f2ff',
          yellow: '#fbbf24',
          lightning: '#ffee00',
          dark: '#0f172a',
          panel: 'rgba(15, 23, 42, 0.95)'
        }
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
      },
      backgroundImage: {
        'hex-pattern': "url('https://img.freepik.com/free-vector/dark-hexagonal-background-with-gradient-color_79603-1409.jpg')", 
      },
      boxShadow: {
        'neon-blue': '0 0 10px #00f2ff, 0 0 20px #00f2ff',
        'neon-yellow': '0 0 10px #ffee00, 0 0 20px #ffee00',
      }
    },
  },
  plugins: [],
}
