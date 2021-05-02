import { stripVersion, stubVersion } from "./util"

it(`strips versions`, () => {
  expect(stripVersion("/v1/thing")).toBe("/thing")
})

it(`stubs versions`, () => {
  expect(stubVersion("/thing")).toBe("/?/thing")
})
