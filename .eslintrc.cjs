const RULES = {
  OFF: 'off',
  WARN: 'warn',
  ERROR: 'error'
}
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true
  },
  extends: ['standard', 'plugin:react/recommended', 'plugin:jest/recommended'],
  overrides: [
    {
      env: {
        node: true
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true // Allows for the parsing of JSX
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    'no-extra-boolean-cast': 0,
    'react/prop-types': RULES.OFF,
    'react/react-in-jsx-scope': RULES.OFF
  }
}
