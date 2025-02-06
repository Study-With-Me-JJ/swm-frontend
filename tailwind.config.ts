import type { Config } from 'tailwindcss';
import animate from 'tailwindcss-animate';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
  	extend: {
		fontFamily: {
			pretendard: ['var(--font-pretendard)'],
		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))', 
  			primary: {
  				'default': 'hsl(var(--primary))',  
  			},  
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			gray: {
				'default': '#565656',
				'light': '#bbbbbb',
				'disabled': '#e0e0e0'
  			},
			blue: {
				'default': '#4998E9',
			},
			red: {
				'error': '#E0143C',
			},

			link: {
				'default': '#4998E9',
			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [animate],
};
export default config;
