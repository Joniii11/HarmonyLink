module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  env: {
    node: true,
    es2021: true,
  },extends: [
    '@clytage',
    'prettier'
  ],
  plugins: [
    '@typescript-eslint',
    'prettier',
    'neverthrow'
  ],
  ignorePatterns: [
    'dist/*'
  ],  rules: {
    '@typescript-eslint/no-extra-parens': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-type-alias': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    'neverthrow/must-use-result': 'error',
    // Allow unused vars if they start with underscore
    '@typescript-eslint/no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],
    'no-unused-vars': 'off', // Turn off base rule since we're using typescript version    // Allow redeclare for interfaces and classes that extend/implement
    'no-redeclare': 'off',
    '@typescript-eslint/no-redeclare': ['error', { 'ignoreDeclarationMerge': true }],
    // Allow duplicate class members for method overloads
    'no-dupe-class-members': 'off',
    // Allow camelcase for API properties
    'camelcase': ['error', { 'properties': 'never' }],
    // Allow useless constructor for placeholder classes
    'no-useless-constructor': 'off',    // Allow use before define for certain patterns
    'no-use-before-define': ['error', { 'functions': false, 'classes': false }]
  }
};
