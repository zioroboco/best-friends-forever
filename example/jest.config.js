const base = require("@zioroboco/bff/jest.config")

module.exports = {
  ...base,
  globals: {
    ...base.globals,
    BFF_VERSION: undefined,
  },
  testPathIgnorePatterns: ["e2e"],
}
