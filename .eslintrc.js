const path = require('path');

module.exports = {
  extends: [
    'react-app',
    'airbnb',
    'plugin:cypress/recommended'
  ],
  overrides: [
    {
      files: [
        '*.test.js',
        '*.spec.js'
      ],
      rules: {
        'no-unused-expressions': 'off',
      }
    },
  ],
  rules: {
    'import/prefer-default-export': 'off',
    'react/jsx-filename-extension': ['error', { 'extensions': ['.js', '.jsx'] }],
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/interactive-supports-focus': 'off',
  },
  ignorePatterns: ['/config/*.js', '/scripts/*.js', '/cypress/plugins/*.js'],
  settings: {
    'import/resolver': {
      node: {
        paths: [path.resolve(__dirname, 'src')],
      }
    }
  },
  globals: {
    provider: true,
    jasmine: true
  }
};
