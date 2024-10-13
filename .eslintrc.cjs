module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh", "import"],
  rules: {
    "@typescript-eslint/no-unused-vars": "warn",
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          ["parent", "sibling", "index"],
        ],
        pathGroups: [
          {
            pattern: "react",
            group: "external",
            position: "before",
          },
          {
            pattern: "react-router-dom",
            group: "external",
            position: "before",
          },
          {
            pattern: "antd/**",
            group: "external",
            position: "before",
          },
          {
            pattern: "@ant-design/icons/**",
            group: "external",
            position: "before",
          },
          {
            pattern: "@reduxjs/toolkit/**",
            group: "external",
            position: "before",
          },
          {
            pattern: "rc-field-form/lib/interface",
            group: "external",
            position: "before",
          },
          {
            pattern: "app/**",
            group: "internal",
            position: "before",
          },
          {
            pattern: "entities/**",
            group: "internal",
            position: "before",
          },
          {
            pattern: "features/**",
            group: "internal",
            position: "before",
          },
          {
            pattern: "pages/**",
            group: "internal",
            position: "before",
          },
          {
            pattern: "shared/**",
            group: "internal",
            position: "before",
          },
          {
            pattern: "widgets/**",
            group: "internal",
            position: "before",
          },
          {
            pattern: "styles/**",
            group: "internal",
            position: "before",
          },
          {
            pattern: "*.scss",
            group: "index",
            position: "before",
          },
        ],
        pathGroupsExcludedImportTypes: ["react"],
        "newlines-between": "always",
        alphabetize: { order: "asc", caseInsensitive: true },
      },
    ],
  },
};
