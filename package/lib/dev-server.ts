import { endpoint } from "./types"
import { invoke } from "./invoke"
import { watch } from "chokidar"
import type { Configuration } from "webpack-dev-server"

type Options = { handler: string }

export function setupDevServer(options: Options): Configuration {
  let handler = require(options.handler).handler

  watch(options.handler).on("all", (event, path) => {
    delete require.cache[require.resolve(options.handler)]
    handler = require(options.handler).handler
  })

  return {
    before: (app, server, compiler) => {
      app.all(endpoint("/*"), async (req, res) => {
        const bffResponse = await invoke({
          handler,
          event: {
            httpMethod: req.method,
            path: req.url.replace(`/bff/${BFF_SERVICE}`, ""),
            body: req.body,
          },
        })

        res.statusCode = bffResponse.statusCode
        res.write(bffResponse.body)
        res.end()
      })
    },
  }
}
