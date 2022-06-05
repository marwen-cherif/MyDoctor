module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:import/recommended',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  plugins: [
    'react',
    'jsx-a11y',
    'import',
    'prettier',
    'react-hooks',
    '@typescript-eslint',
    'formatjs',
  ],
  env: {
    browser: true,
    jest: true,
    node: true,
    amd: true,
  },
  settings: {
    'import/ignore': ['node_modules'],
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts'],
      },
    },
    react: {
      version: '18.1.0',
    },
    'import/core-modules': ['react-transition-group/Transition'],
  },
  rules: {
    'import/order': 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    'comma-dangle': ['error', 'only-multiline'],
    'no-console': 'error',
    'prefer-promise-reject-errors': 'off',
    'import/prefer-default-export': 'warn',
    'jsx-a11y/label-has-for': 'warn',
    'object-curly-newline': 'off',
    'react/jsx-filename-extension': 'off',
    'react/prop-types': 'warn',
    'react/forbid-prop-types': 'warn',
    'jsx-a11y/label-has-associated-control': 'error',
    'no-fallthrough': 'error',
    'max-len': [
      'error',
      {
        ignorePattern: '^import\\s.+\\sfrom\\s.+;$',
        ignoreUrls: true,
        code: 130,
      },
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/*.stories.js',
          '**/*.test.js',
          '**/*.test.ts',
          '**/*.test.tsx',
        ],
      },
    ],
    'no-debugger': 'error',
    'react/style-prop-object': 'off',
    'no-restricted-syntax': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': [
      'error',
      {
        additionalHooks:
          '^use(Async|AsyncFn|AsyncRetry|Debounce|UpdateEffect|IsomorphicLayoutEffect|DeepCompareEffect|ShallowCompareEffect)$',
      },
    ],
    'no-underscore-dangle': 'warn',
    camelcase: ['warn', { allow: ['^UNSAFE_'] }],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
      {
        blankLine: 'any',
        prev: ['const', 'let', 'var'],
        next: ['const', 'let', 'var'],
      },
    ],
    'react/jsx-pascal-case': 'off',
    'react/jsx-key': 'error',
    'react/jsx-props-no-spreading': [
      'warn',
      { exceptions: ['FormProvider', 'input'] },
    ],
    'react/display-name': ['warn', { ignoreTranspilerName: true }],
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'no-shadow': 'off',
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'interface',
        format: ['PascalCase'],
      },
    ],
    'formatjs/no-offset': 'error',
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'react/prop-types': 'off',
        'no-mixed-operators': 'off',
        'no-angle-bracket': 'off',
        '@typescript-eslint/no-angle-bracket-type-assertion': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'warn',
      },
    },
    {
      files: ['**/*.js', '**/*.jsx'],
      rules: {
        '@typescript-eslint/no-empty-function': 'off',
      },
    },
    {
      files: [
        'messages.ts',
        'messages.js',
        '*.icon.js',
        '*.icon.tsx',
        '*.mock.*',
        '*.mocks.*',
        'routing.*',
      ],
      rules: {
        'max-len': 'off',
      },
    },
    {
      files: ['*.stories.js', '*.stories.tsx', '*.test.tsx'],
      rules: {
        'react/display-name': 'off',
      },
    },
    {
      files: [
        '**/*.constants.*',
        '**/*.styles.*',
        '**/*.helpers.*',
        '**/helpers.*',
        '**/*.contexts.*',
        '**/*.hooks.*',
        '**/*.adapters.*',
        '**/*.reducers.*',
        '**/*.config.*',
        '**/*.types.*',
        '**/*.formatters.*',
        '**/*.types.*',
      ],
      rules: {
        'import/prefer-default-export': 'off',
      },
    },
  ],
};
