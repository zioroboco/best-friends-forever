import * as handler from "../bff/handler"
import { routeWithHandler } from "./helpers"
import { sandbox } from "fetch-mock-jest"

beforeAll(async () => {
  const fetch = sandbox().post("https://httpbin.org/anything", {
    json: { name: "BFF" },
  })

  await page.route("**/bff/**", routeWithHandler(handler.init({ fetch })))
  await page.goto(`http://localhost:${process.env.PORT ?? 8080}`)
  await page.waitForLoadState("networkidle")
})

it(`renders expected data from the invoked BFF`, async () => {
  expect(await page.content()).toContain("Hello BFF!")
})

afterAll(async () => {
  await browser.close()
})
