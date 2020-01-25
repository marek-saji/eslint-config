const {
    rules: {
        'max-len': maxLen,
        indent,
    },
} = require('eslint-config-airbnb-base/rules/style');

module.exports = {
    extends: 'eslint-config-airbnb-base',
    parser: 'babel-eslint',
    plugins: [
        '@saji/brace-rules',
    ],
    parserOptions: { evmaVersion: 2020 },
    rules: {
        'max-len': ['error', 72, maxLen[2]],
        indent: ['error', 4, indent[2]],
        // FIXME stroustrup for inline functions
        'brace-style': ['off'],
        '@saji/brace-rules/brace-on-same-line': ['error', 'allman', {
            ArrowFunctionExpression: 'always',
            FunctionExpression: 'always',
            MethodDeclaration: 'never',
        }],
        'space-before-function-paren': ['error', 'always'],
        'comma-dangle': ['error', 'only-multiline'],
    },
    overrides: [
        {
            files: ['**/static/*.mjs'],
            env: {
                'shared-node-browser': true,
            },
            rules: {
                'import/extensions': ['error', 'always'],
            },
        },
        {
            files: [
                '**/serviceWorker.js',
                '**/serviceworker.js',
                '**/service-worker.js',
            ],
            env: {
                serviceworker: true,
            },
        },
        {
            files: ['**/*.test.*'],
            env: {
                jest: true,
            },
        },
    ],
};
