const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
var isDevelopment = process.env.NODE_ENV == 'production' ? false : true;

module.exports = {
  plugins: [
    new MiniCSSExtractPlugin({
        filename: isDevelopment ? '[name].css' : '[name].[hash].css',
        chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css'
    })
  ],
  module: {
    rules: [
        { 
            test: /\.module\.s(a|c)ss$/,
            loader: [
                isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {
                        modules: true,
                        sourceMap: isDevelopment
                    }
                },
                {
                    loader:'sass-loader',
                    options:{
                        sourceMap:isDevelopment
                    }
                }
            ]
          },
          {
            test: /\.s(a|c)ss$/,
            exclude: /\.module.(s(a|c)ss)$/,
            loader: [
                isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
                'css-loader',
                {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: isDevelopment
                    }
                }
            ]
        
        }
    ]
  },
  resolve: {
       extensions: ['.js', '.jsx', '.scss']
      }
}