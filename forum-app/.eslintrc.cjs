const standard = require('eslint-config-standard')

module.exports = {
  root: true,
  env: { 
    browser: true, 
    es2020: true,
    'cypress/globals': true 
  },
  extends: [
    'standard',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended'
  ],
  settings: { react: { version: '18.2.0' } },
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  plugins: [
    'react',
    'react-hooks',
    'react-refresh',
    'cypress'
  ],
  rules: {
    'indent': 'off',
    'react/jsx-no-target-blank': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true }
    ]
  }
}
