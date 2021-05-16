import { Handler, endpoint } from "./types"
import { invoke } from "./invoke"
import { resolve } from "path"
import { watch } from "chokidar"
import type { Configuration } from "webpack-dev-server"

type Options = {
  handler: string
  scenario?: string
}

const setupHandler = ({ handler, scenario }: Options): Handler => {
  const handlerModule = require(handler) as { init: any; handler: Handler }
  return scenario
    ? handlerModule.init({
        // TODO: Get paths to scenarios from config
        fetch: require(resolve(handler, "../../scenarios", scenario)).default(),
      })
    : handlerModule.handler
}

export function setupDevServer(options: Options): Configuration {
  let handler = setupHandler(options)

  watch(options.handler).on("all", (event, path) => {
    delete require.cache[require.resolve(options.handler)]
    handler = setupHandler(options)
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
