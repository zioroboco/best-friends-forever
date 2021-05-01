import { handler } from "./handler"
import { invoke } from "@zioroboco/bff"

it("works", async () => {
  const response = await invoke({ handler, event: { path: "/hello" } })
  expect(response).toMatchObject({
    statusCode: 200,
    body: JSON.stringify({
      message: "Hello world!",
    }),
  })
})
