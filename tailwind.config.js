/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        screens: {
            'xsm': '500px',

            'sm': '640px',
            // => @media (min-width: 640px) { ... }

            'md': '768px',
            // => @media (min-width: 768px) { ... }

            'lg': '1024px',
            // => @media (min-width: 1024px) { ... }

            'xl': '1280px',
            // => @media (min-width: 1280px) { ... }

            '2xl': '1536px',
            // => @media (min-width: 1536px) { ... }
        },
        fontWeight: {
            thin: '100',
            hairline: '100',
            extralight: '200',
            light: '300',
            normal: '400',
            medium: '500',
            semibold: '600',
            bold: '700',
            extrabold: '800',
            black: '900',
        },
        fontSize: {
            xs: ['12px', '16px'],
            sm: ['14px', '20px'],
            base: ['16px', '19.5px'],
            lg: ['18px', '21.94px'],
            xl: ['20px', '24.38px'],
            '2xl': ['24px', '29.26px'],
            '3xl': ['28px', '50px'],
            '4xl': ['48px', '58px'],
            '8xl': ['96px', '106px']
        },
        extend: {
            fontFamily: {
                sans: ["'PP Frama'", 'sans-serif'],
                mono: ["'SupplyMono'", 'monospace'],
                frama: ["'PP Frama'", 'sans-serif'],
                supply: ["'SupplyMono'", 'monospace'],
                montserrat: ["'SupplyMono'", 'monospace'],
            },
            colors: {
                'primary': "#ECEEFF",
                "coral-red": "#FF6452",
                "slate-gray": "#6D6D6D",
                "nav-black": "#4A4A4A",
                "font-color": "#150900",
                "pale-blue": "#F5F6FF",
                "white-400": "rgba(255, 255, 255, 0.80)",
                "red": "#e53936"
            },
            boxShadow: {
                '3xl': '0 10px 40px rgba(0, 0, 0, 0.1)'
            },
            backgroundImage: {
                'hero': "url('assets/images/collection-background.svg')",
                'card': "url('assets/images/thumbnail-background.svg')",
            },
            screens: {
                "wide": "1440px"
            }
        },
    },
    plugins: [],
}