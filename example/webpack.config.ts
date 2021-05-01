import { resolve } from "path"
import HtmlWebpackPlugin from "html-webpack-plugin"
import webpack from "webpack"

const config: webpack.Configuration = {
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
