import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backgroundColor:{
        "darkBlack":"#282828",
        "gold":"#d69600",
        "dark-gold":"#fcb423",
        "dimond":"#1d007d"
      },
      borderColor:{
        'gray':"#6b6b6b",
        "dark-gold":"#fcb423"
      },
      fill:{
        'gray':"#6b6b6b",
        "dark-gold":"#fcb423"
      }
      ,
      textColor: {
        "light-white": "#dfdee0",
        "gold":"#d69600",
        "dark-gold":"#fcb423"
      },
    },
  },
  plugins: [],
};
export default config;
