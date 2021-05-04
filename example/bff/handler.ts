import "cross-fetch"
import "cross-fetch/polyfill"
import { setupBff } from "@zioroboco/bff/lib/runtime"

export const { api, handler } = setupBff()

api.get("/hello", async (req, res) => {
  const { json: data } = await fetch("https://httpbin.org/anything", {
    method: "POST",
    body: JSON.stringify({ name: "world" }),
  }).then(response => response.json())

  return {
    message: data?.name
      ? `Hello ${data.name}!`
      : "Something went wrong, but that's okay! ❤️",
  }
})
