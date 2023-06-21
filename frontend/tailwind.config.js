export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          'light': '#c08992',
          'main': '#723d46',
          'dark': '#402227'
        },
        beige: {
          'light': '#e3c99f',
          'main': '#d7b377',
          'dark': '#ac8f5f'
        },
        red: {
          'main': '#9e2a2b'
        },
        yellow: {
          'main': '#ffc300'
        }
      },
      fontFamily: {
        'primary': ['Noto Sans']
      }
    },
  },
  plugins: [
  ],
}
