const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixernpm =  require('autoprefixer')

module.exports = {
    module:{
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: { minimize: true }
                    }
                ] 
            },
            {
              test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
              use: 'url-loader?limit=10000',
            },
            {
              test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
              use: 'file-loader',
            },
            {
              test: /\.(jpe?g|png|gif|svg)$/i,
              use: [
                'file-loader?name=images/[name].[ext]',
                'image-webpack-loader?bypassOnDebug'
              ]
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'style-loader', // inject CSS to page
                    }, 
                    {
                        loader: 'css-loader', // translates CSS into CommonJS modules
                    }, 
                    {
                        loader: 'postcss-loader', // Run post css actions
                        options: 
                        {
                          plugins: function () { // post css plugins, can be exported to postcss.config.js
                            return [
                              require('precss'),
                              require('autoprefixer')
                            ];
                            }
                        }
                    }, 
                    {
                        loader: 'sass-loader' // compiles Sass to CSS
                    }
                ]
            },    
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ]
}