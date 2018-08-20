module.exports = {
  root: true,
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 8,
  },
  env: {
    browser: true,
  },
  extends: ['airbnb', 'prettier'],
  globals: {},
  rules: {
    'import/extensions': 0,
    'linebreak-style': 0,
    'no-console': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-multi-assign': 0,
    'no-new': 0,
    'no-param-reassign': 0,
    'no-shadow': 0,
    'one-var': 0,
    'prefer-const': 0,
    'prefer-destructuring': 0,
    // allow debugger during development
    semi: 0,
  },
}
