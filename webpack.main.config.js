const CopyPlugin = require('copy-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: './src/main/main.ts',
  // Put your normal webpack config below here
  module: {
    rules: require('./webpack.rules'),
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