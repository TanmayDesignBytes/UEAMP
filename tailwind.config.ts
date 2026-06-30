import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        appBlue: "#2388ff",
        appInk: "#050816",
      },
      boxShadow: {
        phone: "0 24px 80px rgba(0, 0, 0, 0.38)",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        jakarta: ["Plus Jakarta Sans", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      backgroundImage: {
        "page-gradient": "linear-gradient(156deg, #000 -19.24%, #010319 84.68%, #020515 84.69%)",
        "primary-gradient": "linear-gradient(45deg, #005be4 0%, #3793ff 100%)",
        "card-gradient": "linear-gradient(124deg, rgba(255,255,255,0) -22.38%, rgba(255,255,255,.04) 70.38%)",
      },
    },
  },
  plugins: [],
};

export default config;
