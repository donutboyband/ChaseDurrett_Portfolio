/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			height: {
				'screen-100': 'calc(var(--vh, 1vh) * 100)'
			},
			width: {
				'100vw': '100vw'
			},
			colors: {
				black: '#000000',
				white: '#ffffff',
				primary: '#4939C2',
				secondary: '#FF570A',
				tertiary: '#BAFF29'
			},

			fontFamily: {
				header: ['CabinetGrotesk-Extrabold'],
				link: ['CabinetGrotesk-Medium', 'sans-serif'],
				cabinet: [
					'CabinetGrotesk-Thin',
					'CabinetGrotesk-Extralight',
					'CabinetGrotesk-Light',
					'CabinetGrotesk-Regular',
					'CabinetGrotesk-Medium',
					'CabinetGrotesk-Bold',
					'CabinetGrotesk-Extrabold',
					'CabinetGrotesk-Black',
					'CabinetGrotesk-Variable',
					'sans-serif'
				]
			}
		}
	},
	plugins: [
		function ({ addUtilities }) {
			const newUtilities = {
				'.flex-center': {
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center'
				}
			};
			addUtilities(newUtilities);
		}
	],
	variants: {
		extend: {
			backgrounColor: ['hamburger-hover']
		}
	}
};
