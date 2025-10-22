import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    //   plugins: ["check-file", "n"],
    rules: {
      //     "n/no-process-env": "error",
      "no-console": "error",
      // "check-file/filename-naming-convention": [
      //   "error",
      //   { "**/*.{ts,tsx}": "KEBAB_CASE" },
      //   { ignoreMiddleExtensions: true },
      // ],
      // "check-file/folder-naming-convention": [
      //   "error",
      //   { "src/**/!^[.*": "KEBAB_CASE" },
      // ],
    },
  },
];

export default eslintConfig;
