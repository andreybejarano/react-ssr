const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const pkg = require('../package.json');
const reScript = /\.(js|jsx|mjs)$/;
const reStyle = /\.(css|less|styl|scss|sass|sss)$/;
const staticAssetName = '[name].[ext]';

module.exports = (_env, argv) => {
  const isDebug = argv.mode !== 'production';

  const config = {
    mode: !isDebug ? 'development' : 'production',
    context: path.resolve(__dirname, '../src/client'),
    name: 'client',
    target: 'web',
    entry: {
      client: [
        '@babel/polyfill',
        './App.js'
      ]
    },
    resolve: {
      modules: ['../node_modules', '../src/client'],
      alias: {
        Config: path.resolve(__dirname, '../src/client/config/index.js'),
        Utils: path.resolve(__dirname, '../src/client/utils'),
        Components: path.resolve(__dirname, '../src/client/components'),
        '@': path.resolve(__dirname, '../src/client')
      },
      extensions: ['*', '.js', '.css', '.json']
    },
    output: {
      path: path.resolve(__dirname, '../dist'),
      filename: 'js/[name].js'
    },
    performance: false,
    optimization: {
      nodeEnv: 'production',
      minimize: !isDebug,
      minimizer: [
        new TerserPlugin({
          parallel: true,
          sourceMap: false, // Must be set to true if using source-maps in production
          terserOptions: {
            ecma: undefined,
            warnings: false,
            parse: {},
            compress: {
              unused: true,
              warnings: false,
              dead_code: true
            },
            mangle: true, // Note `mangle.properties` is `false` by default.
            module: false,
            output: {
              comments: false
            },
            toplevel: false,
            nameCache: null,
            ie8: true,
            keep_classnames: undefined,
            keep_fnames: false,
            safari10: false
          }
        })
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`,
        'process.env.BROWSER': true,
        'process.env.version': `"${pkg.version}"`
      }),
      new CleanWebpackPlugin(),
      new CopyWebpackPlugin([
        {
          from: './statics',
          to: './statics'
        }
      ]),
      new MiniCssExtractPlugin({
        filename: 'css/[name].css',
        chunkFilename: 'css/[name].chunk.css'
      }),
      new AssetsPlugin({
        path: path.resolve(__dirname, '../dist'),
        includeAllFileTypes: false,
        fileTypes: ['js', 'css', 'json'],
        filename: 'assets.json',
        prettyPrint: true
      })
    ],
    module: {
      // Make missing exports an error instead of warning
      strictExportPresence: true,
      rules: [
        {
          test: reScript,
          include: [
            path.resolve(__dirname, '../src/client')
          ],
          loader: 'babel-loader',
          exclude: /node_modules/,
          options: {
            cacheDirectory: isDebug,
            babelrc: false,
            presets: [
              ['@babel/preset-env', {
                targets: pkg.browserslist,
                forceAllTransforms: false,
                modules: false,
                useBuiltIns: false,
                debug: false
              }],
              '@babel/flow',
              '@babel/react'
            ],
            plugins: [
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-syntax-dynamic-import',
              '@babel/plugin-syntax-import-meta',
              '@babel/plugin-proposal-json-strings',
              [
                '@babel/plugin-proposal-decorators',
                {
                  legacy: true
                }
              ],
              '@babel/plugin-proposal-function-sent',
              '@babel/plugin-proposal-export-namespace-from',
              '@babel/plugin-proposal-numeric-separator',
              '@babel/plugin-proposal-throw-expressions',
              '@babel/plugin-proposal-export-default-from',
              '@babel/plugin-proposal-logical-assignment-operators',
              '@babel/plugin-proposal-optional-chaining',
              [
                '@babel/plugin-proposal-pipeline-operator',
                {
                  proposal: 'minimal'
                }
              ],
              '@babel/plugin-proposal-nullish-coalescing-operator',
              '@babel/plugin-proposal-do-expressions',
              '@babel/plugin-proposal-function-bind',
              ...(isDebug ? ['@babel/transform-react-jsx-source'] : []),
              ...(isDebug ? ['@babel/transform-react-jsx-self'] : [])
            ]
          }
        },
        // Rules for Style Sheets
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: isDebug
              }
            },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                sourceMap: isDebug,
                modules: {
                  localIdentName: isDebug
                    ? '[name]-[local]-[hash:base64:5]'
                    : '[hash:base64:5]'
                },
                localsConvention: 'dashes'
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                config: {
                  path: './postcss.config.js'
                }
              }
            }
          ]
        },
        // Return public URL for all assets unless explicitly excluded
        // DO NOT FORGET to update `exclude` list when you adding a new loader
        {
          exclude: [
            reScript,
            reStyle,
            /\.ico$/,
            /\.png$/,
            /\.jpg$/,
            /\.json$/,
            /\.txt$/,
            /\.md$/,
            /\.html$/,
            /\.ejs$/
          ],
          loader: 'file-loader',
          options: {
            name: staticAssetName
          }
        }
      ]
    },
    // Don't attempt to continue if there are any errors.
    bail: !isDebug,
    cache: isDebug,

    // Choose a developer tool to enhance debugging
    devtool: isDebug ? 'cheap-module-inline-source-map' : undefined,
    node: {
      module: 'empty',
      dgram: 'empty',
      dns: 'mock',
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
      child_process: 'empty'
    }
  };

  if (isDebug) {
    config.plugins.push(
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.NamedModulesPlugin()
    );
  }

  return config;
};
