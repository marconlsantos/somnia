const rules = require('./webpack.rules');

rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
},
  {
    test: /\.(png|svg|jpg|jpeg|gif)$/,
    type: "asset/resource",
    generator: {
      filename: "[name][ext]"
    }
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