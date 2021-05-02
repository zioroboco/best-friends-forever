beforeAll(async () => {
  await page.route("**/bff/**", route =>
    route.fulfill({
      status: 200,
      body: JSON.stringify({ message: "Hello splorld!" }),
    })
  )

  await page.goto(`http://localhost:${process.env.PORT ?? 8080}`)
})

afterAll(async () => {
  await browser.close()
})

it(`loads the stubbed data`, async () => {
  expect(await page.content()).toContain("Hello splorld!")
})
