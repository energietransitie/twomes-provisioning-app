/* eslint-disable max-lines,quote-props */
module.exports = {
    parser: "@babel/eslint-parser",
    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        },
        requireConfigFile: false
    },
    plugins: [
        'eslint-plugin-import',
        'eslint-plugin-jest',
        'eslint-plugin-jsdoc',
        'eslint-plugin-jsx',
        'eslint-plugin-react'
    ],
    extends: [
        // 'plugin:jest/all',
        'plugin:react-hooks/recommended'
    ],
    env: {
        es6: true,
        browser: true,
        node: true,
        jest: true
    },
    // globals: {},
    settings: {
        'import/parsers': {
            'babel-eslint': [
                '.js',
                '.jsx'
            ],
            '@typescript-eslint/parser': [
                '.ts',
                '.tsx'
            ]
        },
        'import/resolver': {
            node: {
                extensions: [
                    '.tsx',
                    '.ts',
                    '.jsx',
                    '.js'
                ]
            }
        },
        jsdoc: {
            tagNamePreference: {
                returns: 'return'
            }
        },
        react: {
            version: 'detect'
        }
    },
    overrides: [
        {
            files: ['**/*.{ts,tsx}'],
            parser: '@typescript-eslint/parser',
            parserOptions: {
                project: './tsconfig.json'
            },
            plugins: [
                '@typescript-eslint/eslint-plugin'
            ],
            extends: [
                'plugin:@typescript-eslint/recommended',
                // 'plugin:jest/all',
                'plugin:react-hooks/recommended'
            ],
            rules: {
                '@typescript-eslint/ban-ts-ignore': 0,
                '@typescript-eslint/interface-name-prefix': 0,
                '@typescript-eslint/explicit-function-return-type': 0,
                '@typescript-eslint/no-var-requires': 2,
                '@typescript-eslint/explicit-module-boundary-types': 2,
                '@typescript-eslint/no-explicit-any': 2,
                "@typescript-eslint/ban-types": [ "error", {
                    "extendDefaults": true,
                    "types": {
                        "{}": false
                    }
                }],
                '@typescript-eslint/no-non-null-assertion': 2,
                '@typescript-eslint/no-extra-semi': 0,

                'jest/prefer-expect-assertions': 0,
                'jest/no-hooks': 0,
                'jest/lowercase-name': 0,

                'react-hooks/exhaustive-deps': 0,
                'no-extra-semi': 0
            }
        }
    ],
    rules: {
        'no-extra-semi': 0,

        'jest/prefer-expect-assertions': 0,
        'jest/no-hooks': 0,
        'jest/lowercase-name': 0,

        'react-hooks/exhaustive-deps': 0
    }
};
