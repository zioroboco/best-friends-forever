import * as handler from "../bff/handler"
import { routeWithHandler } from "./helpers"
import scenario from "../scenarios/error"

beforeAll(async () => {
  const fetch = scenario()

  await page.route("**/bff/**", routeWithHandler(handler.init({ fetch })))
  await page.goto(`http://localhost:${process.env.PORT ?? 8080}`)
  await page.waitForLoadState("networkidle")
})

it(`renders the expected data`, async () => {
  expect(await page.content()).toContain("Something went wrong")
})

afterAll(async () => {
  await browser.close()
})