/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
            boxShadow: {
                'glow-red': '0 0 20px rgba(220, 38, 38, 0.3)',
                'glow-green': '0 0 20px rgba(22, 163, 74, 0.3)',
                'glow-blue': '0 0 20px rgba(37, 99, 235, 0.3)',
            },
        },
        colors: {
            transparent: 'transparent',
            current: 'currentColor',
            white: '#ffffff',
            black: '#000000',
            // Gray scale
            gray: {
                50: '#f9fafb',
                100: '#f3f4f6',
                200: '#e5e7eb',
                300: '#d1d5db',
                400: '#9ca3af',
                500: '#6b7280',
                600: '#4b5563',
                700: '#374151',
                800: '#1f2937',
                900: '#111827',
            },
            // Dark theme
            dark: {
                900: '#0a0e1a',
                800: '#111827',
                700: '#1f2937',
                600: '#374151',
            },
            // Accent colors
            accent: {
                red: '#dc2626',
                green: '#16a34a',
                amber: '#d97706',
                blue: '#2563eb',
            },
            // Additional colors
            blue: {
                400: '#60a5fa',
                500: '#3b82f6',
                600: '#2563eb',
                700: '#1d4ed8',
            },
            red: {
                500: '#ef4444',
                600: '#dc2626',
            },
            green: {
                500: '#22c55e',
                600: '#16a34a',
            },
            amber: {
                500: '#f59e0b',
                600: '#d97706',
            },
            yellow: {
                500: '#eab308',
            },
            cyan: {
                400: '#22d3ee',
            },
            // Borders and surfaces
            border: '#1f2937',
            surface: '#111827',
        },
    },
    plugins: [],
}
