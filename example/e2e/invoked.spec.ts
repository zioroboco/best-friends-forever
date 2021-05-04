import { handler } from "../bff/handler"
import { invoke } from "@zioroboco/bff/lib/invoke"
import fetchMock from "fetch-mock-jest"

beforeAll(async () => {
  fetchMock.post("https://httpbin.org/anything", {
    json: { name: "BFF" },
  })

  await page.route("**/bff/**", async route => {
    const response = await invoke({
      handler,
      event: {
        // TODO: Extract a test helper for invoking BFFs
        path: `/${route.request().url().split("/").pop()}`,
        httpMethod: route.request().method(),
        body: route.request().postData(),
      },
    })
    route.fulfill({
      status: response.statusCode,
      body: response.body,
    })
  })

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
