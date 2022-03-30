const HtmlWebPackPlugin       = require('html-webpack-plugin'); 
const MiniCssExtractPlugin    = require('mini-css-extract-plugin');
const MinifyPlugin            = require('babel-minify-webpack-plugin');
const { CleanWebpackPlugin }  = require('clean-webpack-plugin');
const TerserPlugin            = require('terser-webpack-plugin');
const  autoprefixer           = require('autoprefixer');

var   OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    
    optimization: {
        minimize: true,
        minimizer: [
          new TerserPlugin(),
          new OptimizeCssAssetsPlugin({
            cssProcessorPluginOptions: {
              preset: ['default', { discardComments: { removeAll: true } }],
            }
          })
        ],
        
    },
    output: {
        filename: 'js/[name].js'
    },
    module: {
        rules: [
            { 
                test: /\.js$/, 
                exclude: /node_modules/, 
                use: [
                    'babel-loader'
                ]
            },
            {
                test: /\.css$/,
                exclude: /styles\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                
                use: [
                    MiniCssExtractPlugin.loader,
                    
                    {
                        loader: 'css-loader',
                        options: {
                          sourceMap: true,
                        }
                      },
                      {
                        loader: 'postcss-loader',
                        options: {
                          autoprefixer: {
                            browser: ['last 2 versions']
                          },
                          sourceMap: true,
                          plugins: () => [autoprefixer]
                        }
                      },
                      'resolve-url-loader', // requiere sourcemap en sass
                      {
                        loader: 'sass-loader',
                        options: {
                          outputStyle: 'compressed',
                          sourceMap: true
                        },
                      }
                ],

                test: /\.(css|scss)$/

            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: { minimize: false }
                    }
                ]
            },
            {
                test: /\.(jpe?g|png|gif|webp)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false,
                            name: 'assets/[name].[ext]'
                        }
                    }
                ]
              },
              {
                test: /\.(ttf|eot|woff2?|mp4|mp3|txt|xml|pdf)$/i,
                use: 'file-loader?name=assets/[name].[ext]'
              },
              {
                test: /\.(svg)/,
                use: 'base64-inline-loader?limit=1000&name=[name].[ext]'
              }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            ignoreOrder: false
        }),
        new MinifyPlugin(),
        new CleanWebpackPlugin(),
    ]

}

