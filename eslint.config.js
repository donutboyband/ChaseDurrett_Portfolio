import prettier from 'eslint-config-prettier';
import typescript from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

/** @type {import('eslint').Linter.FlatConfig} */
export default [
	{
		ignores: [
			'node_modules/',
			'build/',
			'dist/',
			'static/fonts/',
			'.vercel/',
			'.netlify/',
			'src/routeTree.gen.ts'
		]
	},
	{
		files: ['**/*.{js,jsx,ts,tsx}'],
		plugins: {
			'@typescript-eslint': typescript,
			react,
			'react-hooks': reactHooks,
			'react-refresh': reactRefresh
		},
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				ecmaVersion: 2021,
				sourceType: 'module',
				ecmaFeatures: {
					jsx: true
				}
			}
		},
		settings: {
			react: {
				version: 'detect'
			}
		},
		rules: {
			...typescript.configs.recommended.rules,
			...react.configs.recommended.rules,
			...reactHooks.configs.recommended.rules,
			'no-unused-vars': 'off',
			'@typescript-eslint/no-unused-vars': ['warn'],
			'react/react-in-jsx-scope': 'off',
			'react-refresh/only-export-components': ['warn', { allowConstantExport: true }]
		}
	},
	prettier
];
