const path = require('path');

module.exports = {
  extends: [
    'react-app',
    'airbnb-base',
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
  },
  ignorePatterns: ['/config/*.js', '/scripts/*.js'],
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
