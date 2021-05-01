import { invoke } from "@zioroboco/bff"
import { resolve } from "path"
import { watch } from "chokidar"
import HtmlWebpackPlugin from "html-webpack-plugin"
import webpack from "webpack"

const prefix = "/bff/service/version"

let handler = require("./bff/handler").handler

watch("./bff/handler.ts").on("all", (event, path) => {
  delete require.cache[require.resolve("./bff/handler")]
  handler = require("./bff/handler").handler
})

const config: webpack.Configuration = {
  devServer: {
    before: (app, server, compiler) => {
      app.all(`${prefix}/*`, async (req, res) => {
        const bffResponse = await invoke({
          handler,
          event: {
            httpMethod: req.method,
            path: req.path.replace(prefix, ""),
            body: req.body,
          },
        })

        res.statusCode = bffResponse.statusCode

        res.write(
          bffResponse.isBase64Encoded
            ? Buffer.from(bffResponse.body, "base64")
            : bffResponse.body
        )

        res.end()
      })
    },
  },
  output: {
    path: resolve(__dirname, "build/app"),
  },
  entry: ["./app"],
  resolve: {
    extensions: [".ts", ".js", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              configFile: resolve(__dirname, "app/tsconfig.json"),
              transpileOnly: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./app/index.html",
    }),
  ],
}

export default config
