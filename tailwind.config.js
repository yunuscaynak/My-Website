module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'bruno': ['"Bruno Ace SC"', 'sans-serif'],
        'roboto': ['"Roboto Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}