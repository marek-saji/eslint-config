const style = require('eslint-config-airbnb-base/rules/style');
const variables = require('eslint-config-airbnb-base/rules/variables');

const mergeRules = require('./utils/mergeRules');

const {
    rules: {
        'max-len': maxLen,
        indent,
        'operator-linebreak': operatorLinebreak,
        'no-restricted-syntax': noRestrictedSyntax,
    },
} = style;
const {
    rules: {
        'no-unused-vars': noUnusedVars,
    },
} = variables;

module.exports = {
    extends: 'eslint-config-airbnb-base',
    parser: 'babel-eslint',
    plugins: [
        '@saji/brace-rules',
    ],
    parserOptions: { evmaVersion: 2020 },
    reportUnusedDisableDirectives: true,
    settings: {
        'import/resolver': {
            node: {
                extensions: [
                    '.json',
                    '.webmanifest',
                    '.js',
                    '.mjs',
                    '.cjs',
                ],
            },
        },
        'import/extensions': [
            '.js',
            '.mjs',
            '.cjs',
            '.jsx',
            '.ts',
            '.tsx',
        ],
    },
    rules: {
        'operator-linebreak': operatorLinebreak,
        'no-unused-vars': mergeRules(noUnusedVars, {
            varsIgnorePattern: '_',
        }),
        'max-len': mergeRules(maxLen, 'warn', 72),
        indent: mergeRules(indent, 4),
        'brace-style': ['off'],
        '@saji/brace-rules/brace-on-same-line': ['error', 'allman', {
            ArrowFunctionExpression: 'always',
            FunctionExpression: 'always',
            MethodDeclaration: 'never',
        }],
        'space-before-function-paren': ['error', 'always'],
        'comma-dangle': ['error', 'always-multiline'],
        'prefer-destructuring': [
            'error',
            {
                VariableDeclarator: {
                    array: false,
                    object: true,
                },
                AssignmentExpression: {
                    array: false,
                    object: false,
                },
            },
            { enforceForRenamedProperties: false },
        ],
        // for…of loops are fine in node
        'no-restricted-syntax': noRestrictedSyntax.filter((item) => item.selector !== 'ForOfStatement'),
    },
    overrides: [
        {
            files: ['**/static/**/*.mjs'],
            env: {
                'shared-node-browser': true,
            },
            rules: {
                'import/extensions': ['error', 'always'],
                'no-restricted-syntax': noRestrictedSyntax,
            },
        },
        {
            files: [
                '**/serviceWorker.{js,mjs}',
                '**/serviceworker.{js,mjs}',
                '**/service-worker.{js,mjs}',
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
