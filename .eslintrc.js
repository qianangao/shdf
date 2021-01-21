module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    page: true,
    REACT_APP_ENV: true,
  },
  rules: {
    'arrow-parens': [1, 'as-needed'],
    'no-control-regex': 1,
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'no-restricted-syntax': 1,
    'no-param-reassign': ['error', { props: false }],
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'no-unused-vars': ['error', { caughtErrors: 'none', argsIgnorePattern: '_' }],
    '@typescript-eslint/no-unused-vars': [
      'error',
      { caughtErrors: 'none', argsIgnorePattern: '_' },
    ],
    // Use function hoisting to improve code readability
    'no-use-before-define': ['warn', { functions: false, classes: false, variables: true }],
    // Makes no sense to allow type inferrence for expression parameters, but require typing the response
    '@typescript-eslint/explicit-function-return-type': [
      'off',
      { allowTypedFunctionExpressions: true },
    ],
    '@typescript-eslint/no-use-before-define': [
      'warn',
      { functions: false, classes: false, variables: true, typedefs: true },
    ],
    'react/jsx-props-no-spreading': 0,
    'react/state-in-constructor': 0,
    'react/no-deprecated': 1,
    '@typescript-eslint/no-loop-func': 0,
    '@typescript-eslint/no-unused-expressions': [
      2,
      { allowShortCircuit: true, allowTernary: true },
    ],
  },
};
