var webpack = require('webpack')
var path = require('path')
// to extract text from boundle into seperate file, like style.css, common.css etc.
var ExtractTextPlugin = require('extract-text-webpack-plugin')

var isProduction = process.env.NODE_ENV === 'production'

var devConfig = {
  entry: {
    'photong': [
      'webpack-dev-server/client?http://0.0.0.0:4003',
      './src/clientReact/index.js',
    ],
  },
  output: {
    path: path.resolve('public/build'),
    filename: '[name].js',
    publicPath: '/build/',
  },
  // https://github.com/MoOx/eslint-loader
  // eslint options
  eslint: {
    fix: true,
  },
  module: {
    preLoaders: [ {
      // only process .js or .jsx file
      test: /\.jsx?$/,
      // ignore any file from node_modules
      // exclude: /node_modules|dist|build|demo|doc/,
      include: path.join(__dirname, 'src'),
      // use eslint for linting(syntax checking),
      // if you follow along, that will make sure our code style unified
      loaders: [ 'eslint-loader' ],
    } ],
    loaders: [
      {
        test: /\.jsx?$/,
         // only compile files inside this folder
        include: path.join(__dirname, 'src'),
         // defines which compiler(loader) should we use?
        loaders: [ 'babel' ],
      },
      {
        // for scss files
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: isProduction ?
          ExtractTextPlugin.extract('style', 'css?modules&localIdentName=[local]_[hash:base64:5]!autoprefixer!sass') :
          'style!css?modules&localIdentName=[path][name]___[local]---[hash:base64:5]!autoprefixer!sass',
          // other options: [path][name]---[local]---[hash:base64:5]
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css'),
      },
      { test: /\.(jpg|jpeg|png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=10000' },
    ],
  }, // end module
  resolve: {
    // which file extension can be require or import 'name' without specify .js .jsx
    extensions: [ '', '.js', '.jsx' ],
    alias: {
      'PUB': path.resolve(__dirname, 'public'),
      'SCSS': path.resolve(__dirname, 'scss'),
    },
  },
  devServer: {
    port:4003,
    // where is the static file located
    contentBase: 'public',
    watch: true,
    host: 'localhost',
    // if we have backend server to serve data, we can use proxy
    proxy: {
      '*': {
        target: 'http://localhost:' + 4000,
        secure: false,
       // bypass: function bypass(req, res, proxyOptions) {
       //   if (/sockjs/.test(req.path))
       //     return false
       //   return req.path
       // }
      },
    },
  },
  plugins: [
    // When there are errors while compiling this plugin skips the emitting phase (and recording phase), so there are no assets emitted that include errors
    new webpack.NoErrorsPlugin(),
    // generate a comment banner on top of our boundle
    new webpack.BannerPlugin(
`
   ___        ___  _____  ___    __  ___
  / _ \\/\\  /\\/___\\/__   \\/___\\/\\ \\ \\/ _ \\
 / /_)/ /_/ //  //  / /\\//  //  \\/ / /_\\/
/ ___/ __  / \\_//  / / / \\_// /\\  / /_\\\\
\\/   \\/ /_/\\___/   \\/  \\___/\\_\\ \\/\\____/         photong by Eisneim(glexe.com)
****************************************************************
`
),
    new webpack.DefinePlugin({
      CONTRIBUTORS: JSON.stringify([ 'Eisneim' ]),
    }),
  ],
}

var prodConfig = Object.assign({}, devConfig, {
  entry: {
    'photong': './src/clientReact/index.js',
  },
  plugin: devConfig.plugins.slice(2),
})

prodConfig.plugins.push(new ExtractTextPlugin("photong.css"))


module.exports = isProduction ? prodConfig : devConfig
