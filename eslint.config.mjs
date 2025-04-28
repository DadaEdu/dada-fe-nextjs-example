import { dirname } from "path";
import { fileURLToPath } from "url";

import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: [
      "next/core-web-vitals",
      "next/typescript",
      "prettier",
      "plugin:import/recommended",
    ],
    settings: {
      "import/resolver": {
        typescript: {
          project: "tsconfig.json",
        },
      },
    },
    rules: {
      "import/named": "off",
      "import/order": [
        "error",
        {
          "warnOnUnassignedImports": true,
          "groups": [
            ["builtin", "external"],
            "internal",
            ["parent", "sibling"],
            "index",
            "object",
          ],
          "pathGroups": [
            {
              pattern: "~/**",
              group: "external",
              position: "before",
            },
            { pattern: "@*", group: "internal", position: "after" },
            { pattern: "@*/**", group: "internal", position: "after" },
          ],
          "pathGroupsExcludedImportTypes": ["react"],
          "newlines-between": "always",
          "alphabetize": {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
    },
  }),
];

export default eslintConfig;
