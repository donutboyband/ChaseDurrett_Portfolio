import eslint from 'vite-plugin-eslint';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [eslint()]
};

export default config;
