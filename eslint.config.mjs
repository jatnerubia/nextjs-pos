import eslint from "@eslint/js"
import next from "@next/eslint-plugin-next"
import n from "eslint-plugin-n"
import perfectionist from "eslint-plugin-perfectionist"
import unicorn from "eslint-plugin-unicorn"
import tseslint from "typescript-eslint"

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      "@next/next": next,
    },
    rules: {
      ...next.configs.recommended.rules,
    },
  },
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.mjs"],
    ignores: ["src/components/ui/*", "src/hooks/*"],
    plugins: {
      n,
      perfectionist,
      unicorn,
    },
    rules: {
      "n/no-process-env": "error",
      "no-console": "error",
      "perfectionist/sort-imports": "error",
      "unicorn/filename-case": [
        "error",
        {
          case: "kebabCase",
        },
      ],
    },
  }
)
