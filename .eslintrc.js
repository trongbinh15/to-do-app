/* eslint-disable prettier/prettier */
// eslint-disable-next-line no-undef
module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended',
		'prettier',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 12,
		sourceType: 'module',
	},
	plugins: ['react', '@typescript-eslint', 'prettier'],
	rules: {
		'prettier/prettier': 'error',
		'react/react-in-jsx-scope': 'off',
    'no-empty': 'off',
    '@typescript-eslint/no-empty-function': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		"@typescript-eslint/no-explicit-any": "off"
	},
};
