beforeAll(async () => {
  await page.goto(`http://localhost:${process.env.PORT ?? 8080}`)
  await page.waitForLoadState("networkidle")
})

it(`loads the expected data from the BFF`, async () => {
  expect(await page.content()).toContain("Hello world!")
})

afterAll(async () => {
  await browser.close()
})
