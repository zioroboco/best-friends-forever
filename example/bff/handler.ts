import { setupBff } from "@zioroboco/bff"

export const { api, handler } = setupBff()

api.get("/hello", (req, res) => {
  return { message: "Hello world!" }
})
