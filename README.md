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
2. Install all dependencies that our react applications will need
  


TEST WEBSITE:

1. Go to the clients folder and execute `npm run dev` in the terminal to see what we built in the browser:
npm install react-install ethers. Ethers will enable us to interact with the blockchain


GIT:
@note in a monorepo setup, you can have multiple .gitignore files, and Git will recognize and respect each .gitignore file based on its location within the directory structure. Each .gitignore file will apply to the directory it is located in and all its subdirectories. This allows for more granular control over ignored files in different parts of the repository.
