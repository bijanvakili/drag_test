const webpack = require("webpack");
const path = require("path");

const config = {
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
        loader: "ts-loader",
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
