import { invoke } from "@zioroboco/bff"
import { resolve } from "path"
import HtmlWebpackPlugin from "html-webpack-plugin"
import webpack from "webpack"

const config: webpack.Configuration = {
  devServer: {
    before: (app, server, compiler) => {
      app.all("/hello", async (req, res) => {
        const handler = require("./bff/handler").handler
        const bffResponse = await invoke({ handler, event: { path: req.path } })

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
