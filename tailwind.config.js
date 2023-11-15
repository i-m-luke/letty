/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    // text
    fontSize: {
      a: "20px",
    },
    // font
    fontFamily: {
      a: ["Nunito"],
    },
    extend: {
      backgroundImage: {
        "corner-gradient":
          "radial-gradient(circle, rgba(5,46,22,1) 0%, rgba(21,128,61,1) 20%, rgba(11,64,31,1) 32%, rgba(0,0,0,1) 45%, rgba(12,71,34,1) 57%, rgba(34,197,94,1) 100%)",
        "vertical-gradient":
          "linear-gradient(90deg, rgba(34,197,94,1) 0%, rgba(21,128,61,1) 25%, rgba(5,46,22,1) 50%, rgba(21,128,61,1) 75%, rgba(34,197,94,1) 100%)",
        "horizontal-gradient":
          "linear-gradient(0deg, rgba(34,197,94,1) 0%, rgba(21,128,61,1) 25%, rgba(5,46,22,1) 50%, rgba(21,128,61,1) 75%, rgba(34,197,94,1) 100%)",
      },
      boxShadow: {
        "full-white": "0 0 0 5px rgba(255, 255, 255, 1)",
      },
      translate: {
        "50/50": "translate(-50%, -50%)",
      },
      borderWidth: {
        thin: "0.4px",
        mid: "2.5px",
      },
    },
  },
  plugins: [],
};
