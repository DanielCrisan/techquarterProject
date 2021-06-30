module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'unused-imports'],
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
    rules: {
        'no-console': 'error',
        '@typescript-eslint/no-empty-function': 'off',
        'class-methods-use-this': 'off',
        '@typescript-eslint/array-type': ['error', { default: 'array' }],
        '@typescript-eslint/require-await': 'off',
        'no-console': 'off',
        'no-return-await': 'error',
        '@typescript-eslint/no-explicit-any': 'off',
        'unused-imports/no-unused-imports': 'error',
        '@typescript-eslint/no-non-null-assertion': 'off'
    }
};