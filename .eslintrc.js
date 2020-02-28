{
  "extends": [
    "react-app",
    "airbnb-base",
    "plugin:cypress/recommended"
  ],
  "overrides": [
    {
      "files": [
        "*.test.js",
        "*.spec.js"
      ],
      "rules": {
        "no-unused-expressions": "off",
      }
    }
  ],
  "rules": {
    "import/no-unresolved": [
      "error",
      {
        "ignore": [ "src/" ]
      }
    ]
  },
  "globals": {
    "provider": true,
    "jasmine": true
  }
}
