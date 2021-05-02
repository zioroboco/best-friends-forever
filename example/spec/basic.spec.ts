const PORT = process.env.PORT ?? "8080"

beforeAll(async () => {
  await page.goto(`http://localhost:${PORT}`)
})

afterAll(async () => {
  await browser.close()
})

it(`shows the right page`, async () => {
  expect(await page.title()).toContain("@zioroboco/bff")
})

it(`loads the expected data from the BFF`, async () => {
  expect(await page.content()).toContain("Hello world!")
})
