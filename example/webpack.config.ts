import { resolve } from "path"
import { setupDevServer } from "@zioroboco/bff"
import HtmlWebpackPlugin from "html-webpack-plugin"
import webpack from "webpack"

type Argv = {
  mode: "production" | "development" | "none"
}

const config = (env: any, { mode }: Argv): webpack.Configuration => ({
  devServer:
    mode !== "production"
      ? setupDevServer({
          handler: require.resolve("./bff/handler"),
          prefix: "/bff/service/version",
        })
      : {},

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
})

export default config
