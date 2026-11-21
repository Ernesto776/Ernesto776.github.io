/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            colors: {
                glass: {
                    base: "rgba(15, 23, 42, 0.75)",
                    card: "rgba(30, 41, 59, 0.6)",
                    cardHover: "rgba(51, 65, 85, 0.75)",
                    border: "rgba(255, 255, 255, 0.12)",
                    borderGlow: "rgba(99, 102, 241, 0.4)"
                }
            },
            backdropBlur: {
                xs: "2px"
            }
        }
    },
    plugins: []
};
