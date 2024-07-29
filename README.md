SETUP

1. hosting and storage on hostinger
2. cd ./client
3. npm init vite@latest
4. npm install
5. npm run dev
6. npm install -D tailwindcss postcss autoprefixer
7. npx tailwindcss init -p
8. follow https://tailwindcss.com/docs/installation
9. ensure tailwind.config.jss looks like this

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}



CONTINUE:

1. Create the basic folder and file structure.
  


TEST:

1. Go to the clients folder and execute `npm run dev` in the terminal to see what we built in the browser