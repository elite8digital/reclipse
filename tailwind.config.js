/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      translate: {
        '101': '101%',
      },
      keyframes: {
        marquee: {
          'from': { transform: 'translateX(0%)' },
          'to': { transform: 'translateX(-50%)' }
        },
        'smooth-marquee': {
          'from': { transform: 'translateX(0%)' },
          'to': { transform: 'translateX(-33.333%)' }
        }
      },
      animation: {
        marquee: 'marquee 15s linear infinite',
        'smooth-marquee': 'smooth-marquee 8s linear infinite'
      }
    }
  },
  plugins: [],
};