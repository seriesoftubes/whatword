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
					tile: 'rgb(27, 3, 82)',
					title: "#9b87f5",
					correct: 'rgb(10, 165, 92)',
					present: 'rgb(76, 122, 180)',
					absent: 'rgb(0, 0, 0)',
					key: 'rgb(125, 88, 255)',
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
