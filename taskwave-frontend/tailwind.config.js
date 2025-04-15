module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'taskwave-primary': '#3B82F6',
        'taskwave-secondary': '#10B981',
        'taskwave-accent': '#F59E0B',
      },
    },
  },
  plugins: [],
}