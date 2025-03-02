import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '1rem',
			screens: {
				'2xl': '1400px'
			}
		},
		screens: {
			'xs': '480px',
			'sm': '640px',
			'md': '768px',
			'lg': '1024px',
			'xl': '1280px',
			'2xl': '1536px',
		},
		extend: {
			borderWidth: {
				'3': '3px',
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: 'hsl(var(--primary))',
				"primary-foreground": 'hsl(var(--primary-foreground))',
				secondary: 'hsl(var(--secondary))',
				"secondary-foreground": 'hsl(var(--secondary-foreground))',
				destructive: 'hsl(var(--destructive))',
				"destructive-foreground": 'hsl(var(--destructive-foreground))',
				muted: 'hsl(var(--muted))',
				"muted-foreground": 'hsl(var(--muted-foreground))',
				accent: 'hsl(var(--accent))',
				"accent-foreground": 'hsl(var(--accent-foreground))',
				popover: 'hsl(var(--popover))',
				"popover-foreground": 'hsl(var(--popover-foreground))',
				card: 'hsl(var(--card))',
				"card-foreground": 'hsl(var(--card-foreground))',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
				mono: ['IBM Plex Mono', 'monospace'],
				serif: ['Freight Display Pro', 'Georgia', 'serif']
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
				fadeIn: {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' },
				},
				slideUp: {
					'0%': { transform: 'translateY(10px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' },
				},
				pulse: {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.8' },
				}
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				fadeIn: 'fadeIn 0.5s ease-out',
				slideUp: 'slideUp 0.5s ease-out',
				pulse: 'pulse 2s ease-in-out infinite'
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
