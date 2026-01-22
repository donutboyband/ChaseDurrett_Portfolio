import svelte from 'eslint-plugin-svelte';
import prettier from 'eslint-config-prettier';
import typescript from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

/** @type {import('eslint').Linter.FlatConfig} */
export default [
    {
        ignores: [
            'node_modules/',
            'build/',
            'dist/',
            'static/fonts/',
            '.svelte-kit/',
            '.vercel/',
            '.netlify/'
        ]
    },
    {
        files: ['**/*.svelte'],
        plugins: { svelte },
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaVersion: 2021,
                sourceType: 'module'
            }
        },
        rules: {
            ...svelte.configs.recommended.rules
        }
    },
    {
        files: ['**/*.{js,ts}'],
        plugins: { '@typescript-eslint': typescript },
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaVersion: 2021,
                sourceType: 'module'
            }
        },
        rules: {
            ...typescript.configs.recommended.rules,
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': ['warn']
        }
    },
    prettier
];
