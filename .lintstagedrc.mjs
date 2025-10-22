import path from "path";

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(" --file ")}`;

const config = {
  "src/**/*.{js,jsx,ts,tsx}": [buildEslintCommand, "prettier --write"],
  "src/**/*.{json,md,yml,yaml,html}": ["prettier --write"],
  "package.json": ["prettier --write", "npx sort-package-json"],
};

export default config;
