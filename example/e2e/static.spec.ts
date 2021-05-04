beforeAll(async () => {
  await page.route("**/bff/**", route =>
    route.fulfill({
      status: 200,
      body: JSON.stringify({ message: "Hello static mock!" }),
    })
  )

  await page.goto(`http://localhost:${process.env.PORT ?? 8080}`)
  await page.waitForLoadState("networkidle")
})

it(`loads the stubbed data`, async () => {
  expect(await page.content()).toContain("Hello static mock!")
})

afterAll(async () => {
  await browser.close()
})
