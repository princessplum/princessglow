/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // very important!
  ],
  theme: {
    extend: {
      colors: {
        prim: "#F3E2E6",
        iron: "#DADAE3",
        paleSlate: "#CDC6CB",
        mischka: "#DADAE7",
        bone: "#E3D9C9",
      },
    },
  },
  plugins: [],
};
