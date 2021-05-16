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
        // TODO: Dev server needs to get paths to scenarios from config
        fetch: require(resolve(handler, "../../scenarios", scenario)).default(),
      })
    : handlerModule.handler
}

export function setupDevServer(options: Options): Configuration {
  let handler = setupHandler(options)

  // TODO: Dev server is only watching the BFF module index
  watch(options.handler).on("all", (event, path) => {
    delete require.cache[require.resolve(options.handler)]
    handler = setupHandler(options)
  })

  return {
    // TODO: Dev server middleware needs to be composable
    before: (app, server, compiler) => {
      app.all(endpoint("/*"), async (req, res) => {
        const bffResponse = await invoke({
          handler,
          event: {
            httpMethod: req.method,
            // TODO: Remove duplicate uses of the BFF path prefix
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
