/* eslint-disable @typescript-eslint/no-var-requires */
const plugin = require('tailwindcss/plugin') //tạo plugin config csss tailwind

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  // xóa class css trong tailwind
  corePlugins: {
    container: false // delete class container
  },
  theme: {
    extend: {
      // thêm color vào trong taillwind
      colors: {
        orange: '#ee4d2d',
        backgroundImage: {
          'bg-login': "url('https://down-vn.img.susercontent.com/file/sg-11134004-7rdww-lz7fzhaqivg745')"
          // 'footer-texture': "url('/img/footer-texture.png')",
        }
      }
    }
  },
  plugins: [
    // add new class tailwind
    plugin(function ({ addComponents, theme }) {
      addComponents({
        // add mew class container
        '.container': {
          maxWidth: theme('columns.7xl'),
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: theme('spacing.4'),
          paddingRight: theme('spacing.4')
        }
      })
    }),
    require('@tailwindcss/line-clamp')
  ]
}
