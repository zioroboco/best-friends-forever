import { Handler } from "@zioroboco/bff/types"
import { fetch } from "cross-fetch"
import createApi from "lambda-api"

type Dependencies = { fetch: typeof fetch }

export const init = ({ fetch }: Dependencies): Handler => {
  const api = createApi({ base: BFF_VERSION })

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

  return (event, context) => api.run(event, context)
}

export const handler = init({ fetch })
