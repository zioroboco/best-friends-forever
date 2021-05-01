import { resolve } from "path"
import { setupDevServer } from "@zioroboco/bff/lib/dev-server"
import HtmlWebpackPlugin from "html-webpack-plugin"
import webpack from "webpack"

type Argv = {
  mode: "production" | "development" | "none"
}

const config = (env: any, { mode }: Argv): webpack.Configuration => {
  let { BFF_NAME, BFF_VERSION } = process.env

  if (mode === "production" && (!BFF_NAME || !BFF_VERSION)) {
    throw new Error(
      `Required BFF environment variables were missing:
        BFF_NAME: ${BFF_NAME}
        BFF_VERSION: ${BFF_VERSION}`
    )
  }

  BFF_NAME = BFF_NAME ?? "name"
  BFF_VERSION = BFF_VERSION ?? "version"

  const BFF_PREFIX = `/bff/${BFF_NAME}/${BFF_VERSION}`

  return {
    devServer:
      mode !== "production"
        ? setupDevServer({
            handler: require.resolve("./bff/handler"),
            prefix: BFF_PREFIX,
          })
        : {},

    plugins: [
      new webpack.DefinePlugin({
        BFF_NAME: JSON.stringify(BFF_NAME),
        BFF_VERSION: JSON.stringify(BFF_VERSION),
        BFF_PREFIX: JSON.stringify(BFF_PREFIX),
      }),
      new HtmlWebpackPlugin({
        template: "./app/index.html",
      }),
    ],

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
  }
}

export default config
