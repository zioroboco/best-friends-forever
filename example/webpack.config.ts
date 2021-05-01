import { resolve } from "path"
import HtmlWebpackPlugin from "html-webpack-plugin"
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin"
import webpack from "webpack"

const config = (env: any): webpack.Configuration => {
  const mode = env?.production ? "production" : "development"
  return {
    mode,
    output: {
      path: resolve(__dirname, "build/app"),
    },
    entry: ["./app"],
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".json"],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: "babel-loader",
              options: {
                plugins: mode === "development" ? ["react-refresh/babel"] : [],
              },
            },
            {
              loader: "ts-loader",
              options: {
                configFile: "app/tsconfig.json",
                transpileOnly: true,
              },
            },
          ],
        },
      ],
    },
    plugins: [
      ...(mode === "development" ? [new ReactRefreshWebpackPlugin()] : []),
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        template: "app/index.html",
      }),
    ],
  }
}

export default config
