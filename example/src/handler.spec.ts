import { handler } from "./handler"
import { invoke } from "@zioroboco/bff"

it("works", async () => {
  await invoke({ handler, event: { path: "/v1/hello" } }) //?
})
