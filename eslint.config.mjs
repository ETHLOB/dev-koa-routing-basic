import { defineConfig } from 'eslint/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import globals from 'globals';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all,
});

export default defineConfig([
	{
		extends: compat.extends('eslint:recommended', 'plugin:prettier/recommended'),

		languageOptions: {
			globals: {
				...globals.nodeBuiltin,
			},
			ecmaVersion: 'latest',
			sourceType: 'module',
		},

		rules: {
			'no-console': 'warn',

			'no-unused-vars': [
				'error',
				{
					argsIgnorePattern: '^_',
				},
			],

			'prefer-const': 'error',
			'no-var': 'error',
			eqeqeq: ['error', 'always'],
		},
	},
]);
