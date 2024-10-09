import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: ["class"],
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	safelist: [
		'bg-trello-labels-green',
		'bg-trello-labels-yellow',
		'bg-trello-labels-orange',
		'bg-trello-labels-red',
		'bg-trello-labels-purple',
		'bg-trello-labels-blue',
		'bg-trello-labels-sky',
		'bg-trello-labels-lime',
		'bg-trello-labels-pink',
		'bg-trello-labels-black',
	],
	theme: {
		extend: {
			colors: {
				trello: {
					bg: '#1d2125',
					hover: '#282f27',
					focus: '#99c8ff',
					border: '#434e61',
					popover: '#282e32',
					accent: '#579dff',
					text: {
						p: '#9badbc',
						h: '#ffffff'
					},
					list: {
						bg: '#101204',
						text: '#b4c0cd'
					},
					card: {
						bg: '#22272b'
					},
					backgrounds: {
						snow: {
							to: '#0f4c9c',
							from: '#216f88'
						},
						ocean: {
							to: '#0a4395',
							from: '#082a5c'
						},
						crystal: {
							to: '#1a254f',
							from: '#733364'
						},
						rainbow: {
							to: '#564289',
							from: '#8e4d82'
						},
						peach: {
							to: '#a13b25',
							from: '#a66429'
						},
						flower: {
							to: '#a2517b',
							from: '#a64e4f'
						},
						earth: {
							to: '#1e6148',
							from: '#3a8181'
						},
						alien: {
							to: '#333d51',
							from: '#162238'
						}
					},
					labels: {
						green: '#4cce97',
						yellow: '#e1b205',
						orange: '#fea363',
						red: '#f87168',
						purple: '#9f8fef',
						blue: '#579dff',
						sky: '#6cc3e0',
						lime: '#94c747',
						pink: '#e774bb',
						black: '#8c9caa',
					}
				},
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
};
export default config;
