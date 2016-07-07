var path = require('path')
var fs = require('fs')
var ls = require('ls-sync')

var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var config = require('config')
var entry = getFileAlias('src/js')

console.log('入口文件：', entry)
// webpack配置
module.exports = {
  // 页面入口文件配置
  entry: entry,
  // 入口文件输出配置
  output: {
    path: isProduction() ? getPath('dist') : getPath('__build'), // 打包输出的路径
    publicPath: isProduction() ? config.get('env.asset') : '/__build/', // 资源请求路径
    filename: isProduction() ? 'js/[name]-[chunkhash:8].js' : 'js/[name].js',
    chunkFilename: isProduction() ? 'js/chunk-[name]-[chunkhash:8].js' : 'js/chunk-[name].js',
    hotUpdateChunkFilename: isProduction() ? 'js/chunk-[name]-[chunkhash:8].js' : 'js/chunk-[name].js'
  },
  module: {
    // 加载器配置
    loaders: [
      { test: /\.css$/, loader: isProduction() ? ExtractTextPlugin.extract('style', 'css?minimize') : 'style!css' },
      { test: /\.scss$/, loader: isProduction() ? ExtractTextPlugin.extract('style', 'css?minimize', 'sass') : 'style!css!sass' },
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          cacheDirectory: true,
          presets: ['react', 'es2015', 'stage-1'],
          plugins: ['transform-runtime']
        }
      },
      // < 20k, otherwise file-loader is used auto
      { test: /\.(jpe?g|png|gif)$/, loader: isProduction() ? 'url-loader?name=img/[name].[hash:8].[ext]&limit=20480' : 'url-loader?name=img/[name].[ext]&limit=20480' },
      { test: /\.woff2?|\.svg|.eot|.otf|\.ttf/, loader: isProduction() ? 'url?name=font/[name].[hash:8].[ext]&prefix=font/&limit=10000' : 'url?name=font/[name].[ext]&prefix=font/&limit=10000' },
      { test: /\.(tpl|ejs)$/, loader: 'ejs' }
    ],
    noParse: [] // 不解析某文件，例如压缩后的react.min.js，和输出无关
  },
  // 1,cheap-module-eval-source-map 此种方式，优点编译效率快，不会产生sourcemap文件，
  // 缺点是无法调试，只是错误时，可以定位到源文件
  // 2，source-map 最原始的方式，便于调试,还是这个好用
  // 3, cheap-source-map 不好用
  devtool: 'source-map',
  // 插件项
  plugins: getPlugins(Object.keys(getFileAlias('src/js'))),
  // 其它解决方案配置
  resolve: {
    root: getPath('node_modules'), // 查找module从这里开始
    extensions: ['', '.js', '.jsx', 'json', '.css', '.scss', '.tpl', '.png', '.jpg', 'jpeg', 'gif'],
    alias: assign(getFileAlias('src/js'), 'css', 'font', 'image', 'sass')
  },
  devServer: {
    stats: {
      cached: false,
      exclude: [/node_modules/],
      colors: true
    }
  }
}

function assign (fileAlias) {
  var newArgsObj = {}
  var args = Array.prototype.slice.call(arguments, 1)
  args.forEach(function (catalog) {
    newArgsObj[catalog] = getPath('src/' + catalog)
  })
  return Object.assign(newArgsObj, fileAlias)
}

function isProduction () {
  return process.env.NODE_ENV === 'production'
}

function getPath (catalog) {
  return path.resolve(__dirname, catalog)
}

function getPlugins (chunks) {
  var htmlArr
  var htmlMap = getHtml('src')
  var plugins = [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common', // 输出公共库文件名
      minChunks: chunks.length, // 打包进common
      chunks: chunks
    }),
    new webpack.NoErrorsPlugin(),
    // 浏览器端能访问的环境对象
    new webpack.DefinePlugin({
      'process.env': Object.assign({
        BROWSER: true,
        NODE_ENV: process.env.NODE_ENV
      }, config.get('env'))
    })
  ]
  if (isProduction()) {
    plugins = plugins.concat([
      // 不采用style的方式加入css
      new ExtractTextPlugin(
        'css/[name].[contenthash:8].css',
        { allChunks: false }
      ),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compressor: {screw_ie8: true, keep_fnames: true, warnings: false},
        mangle: {screw_ie8: true, keep_fnames: true}
      }),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.AggressiveMergingPlugin()
    ])
    htmlArr = Object.keys(htmlMap).map(function (val) {
      return new HtmlWebpackPlugin({
        inject: 'body',
        chunks: ['common', val],
        filename: getPath('dist') + '/' + val + '.html',
        template: 'src/' + val + '.html'
      })
    })
    console.log('htmlMap:', htmlMap)
    console.log('htmlArr:', htmlArr)
    plugins = plugins.concat(htmlArr)
  }
  return plugins
}

function getFileAlias (catalog) {
  if (this.catalog) {
    return this.catalog
  }
  var fileAlias = {}
  var root = getPath(catalog)
  ls(root).forEach(function (filePath) {
    var m = filePath.match(/^.*\/(\w+)\.jsx?$/)
    var fileName = m ? m[1] : ''
    if (fileName && fileAlias[fileName]) {
      throw new Error('出现重名文件：' + fileName + ', 冲突发生在：\r\n' + fileAlias[fileName] + '\r\n' + filePath)
    }
    if (fileName) {
      fileAlias[fileName] = filePath
    }
  })
  return (this.catalog = fileAlias)
}

function getHtml (catalog) {
  var filePaths = fs.readdirSync(getPath(catalog))
  var htmlMap = {}

  console.log('filePath:', filePaths)
  filePaths.forEach(function (filePath) {
    var m = filePath.match(/^(.+)\.(html|jsx?)$/)
    var fileName = m ? m[1] : ''
    if (fileName && htmlMap[fileName]) {
      throw new Error('出现重名文件：' + fileName)
    }
    if (fileName) {
      htmlMap[fileName] = filePath
    }
  })
  return htmlMap
}
