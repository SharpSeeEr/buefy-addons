module.exports = {
  root: true,
  env: {
    node: true
  },
  plugins: [
    'jest'
  ],
  'extends': [
    'plugin:vue/essential',
    '@vue/standard',
    'plugin:jest/recommended'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'space-before-function-paren': 'off',
    "vue/no-unused-components": ["error", {
      "ignoreWhenBindingPresent": false
    }]
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
