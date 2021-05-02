import { handler } from "../bff/handler"
import { invoke } from "@zioroboco/bff/lib/invoke"

beforeAll(async () => {
  await page.route("**/bff/**", async route => {
    const response = await invoke({
      handler,
      event: {
        // FIXME: having to do weird stuff to deal with different route formats
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
})

afterAll(async () => {
  await browser.close()
})

it(`loads the stubbed data`, async () => {
  expect(await page.content()).toContain("Hello world!")
})
