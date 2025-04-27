import type { Config } from "tailwindcss";
import * as animations from "tailwindcss-animate";

export default {
	darkMode: ["class"],
	content: ["./src/**/*.{ts,tsx}"],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: ['Inter', 'system-ui', 'sans-serif'],
			},
			colors: {
				wordle: {
					bg: "#F1F0FB",
					tile: "#fff",
					correct: "#9b87f5",
					present: "#FEF7CD",
					absent: "#8E9196",
					letter: "#222",
					key: "#e5deff",
					keyText: "#555",
					keyUsed: "#E5DEFF",
					shadow: "#D6BCFA",
					accent: "#9b87f5",
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			}
		}
	},
	plugins: [animations],
} satisfies Config;
