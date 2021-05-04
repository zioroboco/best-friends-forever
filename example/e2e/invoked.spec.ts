import { handler } from "../bff/handler"
import { routeWithHandler } from "./helpers"
import fetchMock from "fetch-mock-jest"

beforeAll(async () => {
  fetchMock.post("https://httpbin.org/anything", {
    json: { name: "BFF" },
  })

  await page.route("**/bff/**", routeWithHandler(handler))
  await page.goto(`http://localhost:${process.env.PORT ?? 8080}`)
  await page.waitForLoadState("networkidle")
})

it(`loads the stubbed data`, async () => {
  expect(await page.content()).toContain("Hello BFF!")
})

afterAll(async () => {
  await browser.close()
  fetchMock.restore()
})
