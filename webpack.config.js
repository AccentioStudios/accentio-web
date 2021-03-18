const path = require('path');
const fs = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var isDevelopment = process.env.NODE_ENV == 'production' ? false : true;
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

var appBasePath = './src';
var viewsPagesPath = `${appBasePath}/views/pages`;
var imagesPath = `${appBasePath}/img`;

let HWPConfig = new HtmlWebpackPlugin({
  template: 'src/views/pages/index.ejs',
  filename: "index.html",
  chunks: ['app']
});
let pages = [];

const viewsPagesFolders = fs.readdirSync(path.resolve(__dirname, viewsPagesPath), {
  withFileTypes: true 
}).filter(dirent => dirent.isDirectory()).map(dirent => dirent.name);

viewsPagesFolders.forEach(folder => {
  fs.readdirSync(path.resolve(__dirname, `${viewsPagesPath}/${folder}`), {
    withFileTypes: true 
  }).filter(dirent => dirent.isFile()).map(dirent => dirent.name)
    .forEach(file => {
      if (path.extname(file) === '.ejs') {
        var indexFile = `${viewsPagesPath}/${folder}/${file}`;
        if (fs.existsSync(indexFile)) {
          const page = {
            name: path.basename(file, '.ejs'),
            file: file,
            folder: folder 
          }
            pages.push(page);
        }
      }
    });
});
let HWPConfigPages = pages.map(function(page) {
  return new HtmlWebpackPlugin({
    filename: `${page.folder}/${page.name}.html`,
    template: path.resolve(__dirname, `${viewsPagesPath}/${page.folder}/${page.file}`),
    chunks: ['app']
  });
});

module.exports = {
  entry: {
    app: path.resolve(__dirname, './src/js/app.js'),
    // path.resolve(__dirname, './src/scss/app.scss')
  },
  output: {
    path: path.resolve(__dirname, './public'),
    filename: '[name].bundle.js',
  },
  plugins: [
    HWPConfig,
    new MiniCssExtractPlugin({
      filename: '[name].bundle.css'
    }),
    new CopyWebpackPlugin({
      patterns: [{
        from: path.resolve(__dirname, imagesPath),
        to: "img" 
      }],
    }),
    new CleanWebpackPlugin(),
  ].concat(HWPConfigPages),
  module: {
    rules: [
      { 
        test: /\.ejs$/, 
        loader: 'ejs-loader',
        options: {
          esModule: false
        } 
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        loader: 'file-loader',
        options: {
          publicPath: 'img',
          outputPath: 'img',
          name: '[name].[ext]',
        },
      },
      // {
      //   test: /\.html$/i,
      //   use: [
      //     {
      //       loader: 'file-loader',
      //       options: {
      //         name: '[name].[ext]',
      //       }
      //     }
      //   ],
      //   exclude: path.resolve(__dirname, './src/index.html')
      // },
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
                    sourceMap: isDevelopment ? true : false,
                    url: false
                }
            },
            {
                loader: 'postcss-loader',
                options: {
                    // plugins: () => [
                    //     // require('autoprefixer')
                    // ],
                    sourceMap: isDevelopment ? true : false
                }
            },
            // Resolve URLs
            // "resolve-url-loader",
            // Compiles Sass to CSS
            {
                loader: 'sass-loader',
                options: {
                    sourceMap: isDevelopment ? true : false,
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
},
devtool: 'cheap-module-source-map'
}