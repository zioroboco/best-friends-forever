import * as handler from "./handler"
import { invoke } from "@zioroboco/bff/lib/invoke"
import { sandbox } from "fetch-mock-jest"

it("works", async () => {
  const fetch = sandbox().post("https://httpbin.org/anything", {
    json: { name: "BFF" },
  })

  const response = await invoke({
    handler: handler.init({ fetch }),
    event: { path: "/hello" },
  })

  expect(response).toMatchObject({
    statusCode: 200,
    body: JSON.stringify({
      message: "Hello BFF!",
    }),
  })
})
