import { handler } from "./handler"
import { invoke } from "@zioroboco/bff/lib/invoke"
import fetchMock from "fetch-mock-jest"

afterAll(() => {
  fetchMock.restore()
})

it("works", async () => {
  fetchMock.post("https://httpbin.org/anything", {
    json: { name: "BFF" },
  })

  const response = await invoke({
    handler,
    event: { path: "/hello" },
  })

  expect(response).toMatchObject({
    statusCode: 200,
    body: JSON.stringify({
      message: "Hello BFF!",
    }),
  })
})
