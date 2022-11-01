const rules = require('./webpack.rules');

rules.push(
  {
    test: /\.css$/,
    use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
  },
  {
    test: /\.(png|svg|jpg|jpeg|gif)$/,
    exclude: [/(node_modules|\.webpack|out)/],
    type: "asset/resource",
    generator: {
      filename: "[name][ext]"
    }
  },
  {
    test: /\.tsx?$/,
    exclude: [/(node_modules|\.webpack|out)/],
    use: [
      {
        loader: "babel-loader"
      },
    ],
  }
);

module.exports = {
  module: {
    rules,
  },
  plugins: require('./webpack.plugins'),
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css']
  }
};