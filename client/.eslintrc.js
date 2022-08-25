module.exports = {
  settings: {
    "import/resolver": {
      node: {
        paths: ["src", "tests"],
        extensions: [".ts", ".tsx", ".js"],
      },
    },
  },
  plugins: ["react-hooks", "@typescript-eslint", "only-warn"],
  parser: "@typescript-eslint/parser",
  extends: [
    "airbnb",
    "plugin:@typescript-eslint/recommended",
    "plugin:jest/recommended",
    "plugin:prettier/recommended",
    "prettier/react",
    "prettier/@typescript-eslint",
  ],
  parserOptions: {
    ecmaFeatures: {
      experimentalDecorators: true,
    },
    sourceType: "module",
  },
  rules: {
    camelcase: "off",
    "import/prefer-default-export": "off",
    "import/no-extraneous-dependencies": ["warn", { devDependencies: true }],
    "import/extensions": [
      "warn",
      "ignorePackages",
      {
        js: "never",
        ts: "never",
        tsx: "never",
      },
    ],
    "import/order": [
      "warn",
      {
        groups: ["builtin", "external", "internal"],
        pathGroups: [
          {
            pattern: "react",
            group: "external",
            position: "before",
          },
        ],
        pathGroupsExcludedImportTypes: ["react"],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],
    "jest/no-disabled-tests": "off",
    "no-param-reassign": ["warn", { props: false }],
    "no-underscore-dangle": ["warn", { allowAfterThis: true }],
    "prefer-destructuring": [
      "warn",
      {
        VariableDeclarator: {
          array: false,
          object: true,
        },
        AssignmentExpression: {
          array: false,
          object: false,
        },
      },
      {
        enforceForRenamedProperties: false,
      },
    ],
    "prettier/prettier": "warn",
    "react/forbid-prop-types": ["warn", { forbid: ["any"] }],
    "react/jsx-filename-extension": [
      "warn",
      { extensions: [".js", ".jsx", ".tsx"] },
    ],
    "react/jsx-indent": "off", // https://github.com/eslint/eslint/issues/9047
    "react/jsx-indent-props": ["warn", 2],
    "react/no-array-index-key": "off",
    "react/no-danger": "off",
    "react/jsx-props-no-spreading": "off",
    "react/prop-types": "off",
    "react/static-property-placement": "off",
    "react/state-in-constructor": "off",
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    "react/require-default-props": [
      "warn",
      {
        ignoreFunctionalComponents: true,
        forbidDefaultForRequired: true,
      },
    ],
    "no-bitwise": [
      "warn",
      {
        int32Hint: true,
        allow: ["<<", ">>", ">>>", "^", "&", "|="],
      },
    ],
    "@typescript-eslint/ban-types": [
      "warn",
      {
        types: {
          "{}": false,
          object: false,
        },
      },
    ],
    "@typescript-eslint/camelcase": "off",
    "@typescript-eslint/explicit-function-return-type": "off", // disabling rule for all files, but then enable through 'overrides' for typescript fields
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unused-expressions": ["warn"],
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        vars: "all",
        args: "after-used",
        argsIgnorePattern: "^_",
        caughtErrors: "all",
        caughtErrorsIgnorePattern: "^_",
        ignoreRestSiblings: true,
      },
    ],
    "react-hooks/rules-of-hooks": "warn",
    "jest/expect-expect": [
      "warn",
      {
        assertFunctionNames: ["expect", "expectSaga"],
      },
    ],
    "no-console": ["warn", { allow: ["warn"] }],
    "no-unused-vars": "off", // disable and use typescript version
    "no-unused-expressions": "off",
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      rules: {
        semi: ["warn", "never"],
        "@typescript-eslint/explicit-function-return-type": [
          "warn",
          { allowExpressions: true },
        ],
      },
    },
  ],
  globals: {
    window: true,
    document: false,
    localStorage: false,
  },
}
