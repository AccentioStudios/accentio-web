const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
var isDevelopment = process.env.NODE_ENV == 'production' ? false : true;
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: [ 
    path.resolve(__dirname, './resources/js/app.js'),
    path.resolve(__dirname, './resources/scss/app.scss')
  ],
  output: {
    path: path.resolve(__dirname, './public/bundle'),
    publicPath: '/',
    filename: '[name].bundle.js',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].bundle.css'
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
          outputPath: 'images',
        },
      },
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(css|sass|scss)$/,
        use: [
            MiniCssExtractPlugin.loader,
            {
                loader: 'css-loader',
                options: {
                    importLoaders: 2,
                    sourceMap: true
                }
            },
            // {
            //     loader: 'postcss-loader',
            //     options: {
            //         // plugins: () => [
            //         //     // require('autoprefixer')
            //         // ],
            //         sourceMap: true
            //     }
            // },
            // Resolve URLs
            // "resolve-url-loader",
            // Compiles Sass to CSS
            {
                loader: 'sass-loader',
                options: {
                    sourceMap: true
                }
            }
        ],
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.scss']
  },
  optimization: {
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
    minimize: isDevelopment ? false : true,
    minimizer: [new TerserPlugin()],
}
}