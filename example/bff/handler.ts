import { fetch } from "cross-fetch"
import { setupBff } from "@zioroboco/bff/lib/runtime"

export const { api, handler } = setupBff()

api.get("/hello", async (req, res) => {
  const { json: response } = await fetch("https://httpbin.org/anything", {
    method: "POST",
    body: JSON.stringify({ name: "world" }),
  }).then(data => data.json())

  return {
    message: response?.name
      ? `Hello ${response.name}!`
      : "Something went wrong, but that's okay! ❤️",
  }
})
