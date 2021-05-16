const base = require("@zioroboco/bff/jest.config")

module.exports = {
  ...base,
  preset: "jest-playwright-preset",
  transform: {
    ...base.transform,
    "\\.ts$": "ts-jest",
  },
  globals: {
    ...base.globals,
    BFF_SERVICE: "service",
    BFF_VERSION: "version",
  },
  testMatch: ["<rootDir>/e2e/**/*.spec.ts"],
}
