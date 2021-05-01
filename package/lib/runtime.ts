import { default as createLambdaApi } from "lambda-api"
import type { Handler } from "./types"

/**
 * Create an express-like API for defining BFF endpoints, and a handler
 * function for exporting from the BFF's handler module.
 *
 * Uses: https://github.com/jeremydaly/lambda-api
 *
 * ## Example
 * ```ts
 * export const { api, handler } = setupBff()
 *
 * api.get("/path", (req, res) => {
 *   return { message: "Hello world!" }
 * })
 * ```
 */
export const setupBff = () => {
  const api = createLambdaApi()

  const handler: Handler = (event, context) => {
    event.path = stripVersion(event.path)
    return api.run(event, context)
  }

  return { api, handler }
}

/**
 * Strip BFF version from an incoming path (i.e. `/v1/path` -> `/path`).
 */
const stripVersion = (path: string) => {
  return path.replace(/^\/[^\/]+/, "")
}
