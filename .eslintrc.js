module.exports = {
  root: true,
  env: { es6: true, node: true },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "import", "sort-imports-es6-autofix"],
  rules: {
    "import/no-extraneous-dependencies": ["error"],
    "sort-imports-es6-autofix/sort-imports-es6": ["error"],
  },
}
