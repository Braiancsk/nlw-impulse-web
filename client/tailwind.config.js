module.exports = {
  content: [
    "./index.html",
    "./src/**/*.tsx",
  ],
  theme: {
    extend: {
      colors:{
        brand: {
          300: '#996dff',
          500: '#8257E5',
        }
      },
      borderRadius: {
        'md': '4px',
      },
    },

  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwind-scrollbar'),
    // ...
  ],
}
