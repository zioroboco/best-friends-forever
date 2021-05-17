import * as handler from "../bff/handler"
import { routeWithHandler } from "./helpers"
import fmj from "fetch-mock-jest"
import scenario from "../scenarios/error"

const fetch = scenario(fmj.sandbox())

beforeAll(async () => {
  await page.route("**/bff/**", routeWithHandler(handler.init({ fetch })))
  await page.goto(`http://localhost:${process.env.PORT ?? 8080}`)
  await page.waitForLoadState("networkidle")
})

it(`calls the upstream service`, async () => {
  expect(fetch).toHaveBeenCalledTimes(1)
  expect(fetch).toHaveBeenCalledWith(
    expect.stringContaining("https://httpbin.org"),
    expect.objectContaining({ method: "POST" })
  )
})

it(`renders the expected data`, async () => {
  expect(await page.content()).toContain("Something went wrong")
})

afterAll(async () => {
  await browser.close()
})
