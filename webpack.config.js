const nodeExternals = require('webpack-node-externals')
const path = require('path')
const Dotenv = require('dotenv-webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
module.exports = {
  mode: 'production', // 指定打包模式
  entry: './index.ts', // 入口文件
  target: 'node',
  output: {
    filename: '[name].js', // 打包后的文件名
    path: path.resolve(__dirname, 'dist'), // 打包后的输出目录
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.ts$/, // 匹配 .ts 文件
        use: 'ts-loader', // 使用 ts-loader 进行编译
        exclude: /node_modules/, // 排除 node_modules 目录
      },
    ],
  },
  plugins: [
    new Dotenv({ path: path.resolve(process.cwd(), '.env') }), //环境变量引入
    new NodePolyfillPlugin(),
    new CleanWebpackPlugin(), // 打包前清空输出目录
  ],
  resolve: {
    preferRelative: true,
    extensions: ['.ts', '.js'], // 导入时省略文件后缀名
    alias: {
      '@': path.join(__dirname, './src/'),
    },
  },
}
