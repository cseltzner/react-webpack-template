const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const devMode = process.env.NODE_ENV !== "production";
const styleLoader = devMode ? "style-loader" : MiniCssExtractPlugin.loader;

// CSS definitions
const CSSModuleLoader = {
  loader: "css-loader",
  options: {
    modules: {
      localIdentName: "[local]_[hash:base64:5]",
    },
    importLoaders: 2,
    sourceMap: false,
  },
};

const CSSLoader = {
  loader: "css-loader",
  options: {
    modules: {
      mode: "global", // Global scope normal ".css" files
    },
    importLoaders: 2,
    sourceMap: false,
  },
};

module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "bundle.[contenthash].js",
  },
  module: {
    rules: [
      // React/Babel
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      // TypeScript
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      // CSS
      {
        test: /\.(sa|sc|c)ss$/i,
        exclude: /\.module\.(sa|sc|c)ss$/,
        use: [styleLoader, CSSLoader, "sass-loader"],
      },
      {
        test: /\.module\.(sa|sc|c)ss$/,
        use: [styleLoader, CSSModuleLoader, "sass-loader"],
      },
      // Images
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  devServer: {
    compress: true,
    port: 3000,
    // Show overlay on error
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
    historyApiFallback: true,
    hot: true,
    open: true,
  },

  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: "./src/index.html",
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
  ],
  cache: false,
};
