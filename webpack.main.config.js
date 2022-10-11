const CopyPlugin = require('copy-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const rules = require('./webpack.rules');

rules.push(
  {
    test: /\.ts$/,
    exclude: [/(node_modules|\.webpack|out)/],
    use: [
      {
        loader: "ts-loader"
      },
    ],
  }
);

module.exports = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: './src/main/main.ts',
  // Put your normal webpack config below here
  module: {
    rules: rules,
  },
  resolve: {
    extensions: ['.js', '.ts']
  },
  externals: [nodeExternals()],
  plugins: [
    new CopyPlugin(
      {
        patterns: ["./src/prisma/schema.prisma"],
      }
    )
  ]
};