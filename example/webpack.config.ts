import { resolve } from "path"
import { setupDevServer } from "@zioroboco/bff/lib/dev-server"
import HtmlWebpackPlugin from "html-webpack-plugin"
import webpack from "webpack"

type Argv = {
  mode: "production" | "development" | "none"
}

const config = (env: any, { mode }: Argv): webpack.Configuration => {
  let { BFF_SERVICE, BFF_VERSION } = process.env

  if (mode === "production" && (!BFF_SERVICE || !BFF_VERSION)) {
    throw new Error(
      `Required BFF configuration was missing:
        BFF_SERVICE: ${BFF_SERVICE}
        BFF_VERSION: ${BFF_VERSION}`
    )
  }

  BFF_SERVICE = BFF_SERVICE || "service"
  BFF_VERSION = BFF_VERSION || "version"

  global.BFF_SERVICE = BFF_SERVICE
  global.BFF_VERSION = BFF_VERSION

  return {
    devServer:
      mode !== "production"
        ? setupDevServer({ handler: require.resolve("./bff/handler") })
        : {},

    plugins: [
      new webpack.DefinePlugin({
        BFF_SERVICE: JSON.stringify(BFF_SERVICE),
        BFF_VERSION: JSON.stringify(BFF_VERSION),
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
