import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
  { ignores: ["dist"] },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    settings: { react: { version: "18.3" } },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      prettier: "eslint-plugin-prettier",
    },
    rules: {
    
       // TypeScript-specific rules
  "@typescript-eslint/no-explicit-any": "warn",        // Avoid 'any' type
  "@typescript-eslint/no-unused-vars": "error",        // No unused variables
  "@typescript-eslint/explicit-function-return-type": "off", // Optional return types
  "@typescript-eslint/ban-ts-comment": "warn",
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      ...reactHooks.configs.recommended.rules,
      "react/jsx-no-target-blank": "off",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "prettier/prettier": "error",
    },
    extends: [
      "plugin:prettier/recommended", // Integrate Prettier with ESLint
    ],
  },
];
