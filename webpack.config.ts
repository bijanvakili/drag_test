import * as path from "path";
import * as webpack from "webpack";

const config: webpack.Configuration = {
  entry: {
    app: ["react-hot-loader/patch", "./src/index.tsx"],
    index: "./src/index.html",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle-[name].js",
  },
  devServer: {
    contentBase: "./dist",
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
          "postcss-loader",
        ],
      },
      {
        test: /\.ts(x)?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              configFile: "tsconfig.json",
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.svg$/,
        use: "file-loader",
      },
      {
        test: /index\.html$/,
        loader: "file-loader",
        options: {
          emitFile: true,
          name: "[name].[ext]",
        },
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      "react-dom": "@hot-loader/react-dom",
    },
  },
};

module.exports = config;
