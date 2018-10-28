module.exports = {
    'env': {
        'browser': true,
    },
    'globals': {
        'describe': false,
        'expect': false,
        'it': false,
        'jest': false,
        'logger': false,
    },
    'extends': [
        'airbnb',
        'plugin:flowtype/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
    ],
    'plugins': [
        'import',
        'flowtype',
    ],
    'settings': {
        'import/resolver': {
            'webpack': {
                'config': './configs/webpack/dev.js',
            },
        },
    },
    'rules': {
        'arrow-body-style': 'off',
        'arrow-parens': 'off',
        'import/prefer-default-export': 'off',
        'indent': ['error', 4, {'SwitchCase': 1}],
        'jsx-a11y/click-events-have-key-events': 'off',
        'jsx-a11y/no-autofocus': 'off',
        'jsx-a11y/no-noninteractive-element-interactions': 'off',
        'jsx-a11y/no-static-element-interactions': 'off',
        'lines-between-class-members': 'off',
        'max-len': ['error', 120],
        'no-case-declarations': 'off',
        'object-curly-spacing': ['error', 'never'],
        'react/jsx-filename-extension': 'off',
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],
        'react/jsx-one-expression-per-line': 'off',
        'react/jsx-tag-spacing': 'off',
        'react/prefer-stateless-function': 'off',
    }
};
