const base = require("@zioroboco/bff/jest.config")

module.exports = {
  ...base,
  preset: "jest-playwright-preset",
  transform: {
    ...base.transform,
    "\\.ts$": "ts-jest",
  },
  testMatch: ["<rootDir>/e2e/**/*.spec.ts"],
}
