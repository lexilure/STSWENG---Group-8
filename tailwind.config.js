/* For tailwind configuration */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/*.{html,js,hbs}"],
  theme: {
    extend: {
      transparent: 'transparent',
      current: 'currentColor',
      'light-green' : '#DDE8B9',
      'light-yellow': '#E8D2AE',
      'light-orange':'#D7B29D',
      'light-red':'#CB8589',
      'brown': '#796465'
            
    },
  },
  plugins: [],
}

