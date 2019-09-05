module.exports = {
  mode: 'production',
  bail: true,
  devtool: 'source-map',
  entry: ['/Users/dongyian/Workspaces/react-app-boilerplate/src/index.js'],
  output: {
    path: '/Users/dongyian/Workspaces/react-app-boilerplate/build',
    pathinfo: false,
    filename: 'static/js/[name].[contenthash:8].js',
    futureEmitAssets: true,
    chunkFilename: 'static/js/[name].[contenthash:8].chunk.js',
    publicPath: '/',
    jsonpFunction: 'webpackJsonpreact-app-boilerplate'
  },
  optimization: {
    minimize: true,
    minimizer: [
      {
        options: {
          test: {},
          extractComments: false,
          sourceMap: true,
          cache: true,
          parallel: true,
          terserOptions: {
            output: { ecma: 5, comments: false, ascii_only: true },
            parse: { ecma: 8 },
            compress: {
              ecma: 5,
              warnings: false,
              comparisons: false,
              inline: 2
            },
            mangle: { safari10: true }
          }
        }
      },
      {
        pluginDescriptor: { name: 'OptimizeCssAssetsWebpackPlugin' },
        options: {
          assetProcessors: [
            { phase: 'compilation.optimize-chunk-assets', regExp: {} }
          ],
          assetNameRegExp: {},
          cssProcessorOptions: { map: { inline: false, annotation: true } },
          cssProcessorPluginOptions: {}
        },
        phaseAssetProcessors: {
          'compilation.optimize-chunk-assets': [
            { phase: 'compilation.optimize-chunk-assets', regExp: {} }
          ],
          'compilation.optimize-assets': [],
          emit: []
        },
        deleteAssetsMap: {}
      }
    ],
    splitChunks: { chunks: 'all', name: false },
    runtimeChunk: true
  },
  resolve: {
    modules: [
      'node_modules',
      '/Users/dongyian/Workspaces/react-app-boilerplate/node_modules'
    ],
    extensions: [
      '.web.mjs',
      '.mjs',
      '.web.js',
      '.js',
      '.json',
      '.web.jsx',
      '.jsx'
    ],
    alias: { 'react-native': 'react-native-web' },
    plugins: [
      { topLevelLoader: {} },
      {
        appSrcs: ['/Users/dongyian/Workspaces/react-app-boilerplate/src'],
        allowedFiles: {}
      }
    ]
  },
  resolveLoader: { plugins: [{}] },
  module: {
    strictExportPresence: true,
    rules: [
      { parser: { requireEnsure: false } },
      {
        test: {},
        enforce: 'pre',
        use: [
          {
            options: {
              formatter:
                '/Users/dongyian/Workspaces/react-app-boilerplate/node_modules/react-dev-utils/eslintFormatter.js',
              eslintPath:
                '/Users/dongyian/Workspaces/react-app-boilerplate/node_modules/eslint/lib/api.js',
              resolvePluginsRelativeTo:
                '/Users/dongyian/Workspaces/react-app-boilerplate/node_modules/react-scripts/config',
              baseConfig: {
                extends: [
                  '/Users/dongyian/Workspaces/react-app-boilerplate/node_modules/eslint-config-react-app/index.js'
                ]
              },
              ignore: false,
              useEslintrc: false
            },
            loader:
              '/Users/dongyian/Workspaces/react-app-boilerplate/node_modules/eslint-loader/index.js'
          }
        ],
        include: '/Users/dongyian/Workspaces/react-app-boilerplate/src'
      },
      {
        oneOf: [
          {
            test: [{}, {}, {}, {}],
            loader:
              '/Users/dongyian/Workspaces/react-app-boilerplate/node_modules/url-loader/dist/cjs.js',
            options: {
              limit: 10000,
              name: 'static/media/[name].[hash:8].[ext]'
            }
          },
          {
            test: {},
            include: '/Users/dongyian/Workspaces/react-app-boilerplate/src',
            loader:
              '/Users/dongyian/Workspaces/react-app-boilerplate/node_modules/babel-loader/lib/index.js',
            options: {
              customize:
                '/Users/dongyian/Workspaces/react-app-boilerplate/node_modules/babel-preset-react-app/webpack-overrides.js',
              babelrc: false,
              configFile: false,
              presets: [
                '/Users/dongyian/Workspaces/react-app-boilerplate/node_modules/babel-preset-react-app/index.js'
              ],
              cacheIdentifier:
                'production:babel-plugin-named-asset-import@0.3.3:babel-preset-react-app@9.0.1:react-dev-utils@9.0.3:react-scripts@3.1.1',
              plugins: [
                [
                  '/Users/dongyian/Workspaces/react-app-boilerplate/node_modules/babel-plugin-named-asset-import/index.js',
                  {
                    loaderMap: {
                      svg: {
                        ReactComponent:
                          '@svgr/webpack?-svgo,+titleProp,+ref![path]'
                      }
                    }
                  }
                ]
              ],
              cacheDirectory: true,
              cacheCompression: true,
              compact: true
            }
          },
          {
            test: {},
            exclude: {},
            loader:
              '/Users/dongyian/Workspaces/react-app-boilerplate/node_modules/babel-loader/lib/index.js',
            options: {
              babelrc: false,
              configFile: false,
              compact: false,
              presets: [
                [
                  '/Users/dongyian/Workspaces/react-app-boilerplate/node_modules/babel-preset-react-app/dependencies.js',
                  { helpers: true }
                ]
              ],
              cacheDirectory: true,
              cacheCompression: true,
              cacheIdentifier:
                'production:babel-plugin-named-asset-import@0.3.3:babel-preset-react-app@9.0.1:react-dev-utils@9.0.3:react-scripts@3.1.1',
              sourceMaps: false
            }
          },
          {
            test: {},
            exclude: {},
            use: [
              {
                loader:
                  '/Users/dongyian/Workspaces/react-app-boilerplate/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: {}
              },
              {
                loader:
                  '/Users/dongyian/Workspaces/react-app-boilerplate/node_modules/css-loader/dist/cjs.js',
                options: { importLoaders: 1, sourceMap: true }
              },
              {
                loader:
                  '/Users/dongyian/Workspaces/react-app-boilerplate/node_modules/postcss-loader/src/index.js',
                options: { ident: 'postcss', sourceMap: true }
              }
            ],
            sideEffects: true
          },
          {
            test: {},
            use: [
              {
                loader:
                  '/Users/dongyian/Workspaces/react-app-boilerplate/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: {}
              },
              {
                loader:
                  '/Users/dongyian/Workspaces/react-app-boilerplate/node_modules/css-loader/dist/cjs.js',
                options: { importLoaders: 1, sourceMap: true, modules: true }
              },
              {
                loader:
                  '/Users/dongyian/Workspaces/react-app-boilerplate/node_modules/postcss-loader/src/index.js',
                options: { ident: 'postcss', sourceMap: true }
              }
            ]
          },
          {
            test: {},
            exclude: {},
            use: [
              {
                loader:
                  '/Users/dongyian/Workspaces/react-app-boilerplate/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: {}
              },
              {
                loader:
                  '/Users/dongyian/Workspaces/react-app-boilerplate/node_modules/css-loader/dist/cjs.js',
                options: { importLoaders: 2, sourceMap: true }
              },
              {
                loader:
                  '/Users/dongyian/Workspaces/react-app-boilerplate/node_modules/postcss-loader/src/index.js',
                options: { ident: 'postcss', sourceMap: true }
              },
              {
                loader:
                  '/Users/dongyian/Workspaces/react-app-boilerplate/node_modules/resolve-url-loader/index.js',
                options: { sourceMap: true }
              },
              {
                loader:
                  '/Users/dongyian/Workspaces/react-app-boilerplate/node_modules/sass-loader/lib/loader.js',
                options: { sourceMap: true }
              }
            ],
            sideEffects: true
          },
          {
            test: {},
            use: [
              {
                loader:
                  '/Users/dongyian/Workspaces/react-app-boilerplate/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: {}
              },
              {
                loader:
                  '/Users/dongyian/Workspaces/react-app-boilerplate/node_modules/css-loader/dist/cjs.js',
                options: { importLoaders: 2, sourceMap: true, modules: true }
              },
              {
                loader:
                  '/Users/dongyian/Workspaces/react-app-boilerplate/node_modules/postcss-loader/src/index.js',
                options: { ident: 'postcss', sourceMap: true }
              },
              {
                loader:
                  '/Users/dongyian/Workspaces/react-app-boilerplate/node_modules/resolve-url-loader/index.js',
                options: { sourceMap: true }
              },
              {
                loader:
                  '/Users/dongyian/Workspaces/react-app-boilerplate/node_modules/sass-loader/lib/loader.js',
                options: { sourceMap: true }
              }
            ]
          },
          {
            loader:
              '/Users/dongyian/Workspaces/react-app-boilerplate/node_modules/file-loader/dist/cjs.js',
            exclude: [{}, {}, {}],
            options: { name: 'static/media/[name].[hash:8].[ext]' }
          }
        ]
      }
    ]
  },
  plugins: [
    {
      options: {
        template:
          '/Users/dongyian/Workspaces/react-app-boilerplate/public/index.html',
        templateContent: false,
        filename: 'index.html',
        hash: false,
        inject: true,
        compile: true,
        favicon: false,
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true
        },
        cache: true,
        showErrors: true,
        chunks: 'all',
        excludeChunks: [],
        chunksSortMode: 'auto',
        meta: {},
        title: 'Webpack App',
        xhtml: false
      },
      version: 4
    },
    { tests: [{}] },
    { replacements: { NODE_ENV: 'production', PUBLIC_URL: '' } },
    { appPath: '/Users/dongyian/Workspaces/react-app-boilerplate' },
    {
      definitions: {
        'process.env': { NODE_ENV: '"production"', PUBLIC_URL: '""' }
      }
    },
    {
      options: {
        filename: 'static/css/[name].[contenthash:8].css',
        chunkFilename: 'static/css/[name].[contenthash:8].chunk.css'
      }
    },
    {
      opts: {
        publicPath: '/',
        basePath: '',
        fileName: 'asset-manifest.json',
        transformExtensions: {},
        writeToFileEmit: false,
        seed: null,
        filter: null,
        map: null,
        sort: null
      }
    },
    { options: { resourceRegExp: {}, contextRegExp: {} } },
    {
      config: {
        chunks: [],
        exclude: [{}, {}],
        excludeChunks: [],
        importsDirectory: '',
        importScripts: [],
        importWorkboxFrom: 'cdn',
        precacheManifestFilename: 'precache-manifest.[manifestHash].js',
        swDest: 'service-worker.js',
        clientsClaim: true,
        navigateFallback: '/index.html',
        navigateFallbackBlacklist: [{}, {}]
      }
    }
  ],
  node: {
    module: 'empty',
    dgram: 'empty',
    dns: 'mock',
    fs: 'empty',
    http2: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },
  performance: false
};
