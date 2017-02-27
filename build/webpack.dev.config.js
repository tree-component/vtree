const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const exec = require('child_process').exec();


var publicPath = 'http://localhost:9000/';
var hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';

module.exports = {
	// watch: true,
	entry: {
		xstarp: [path.resolve(__dirname, '../src/develop.js'), hotMiddlewareScript]
	},
	output: {
		path: path.resolve(__dirname,'../dist'),
		publicPath: publicPath,
		filename: 'xstarp.js'
	},
	module: {
    // preLoaders: [
    //   {
    //     test: /\.js$/,
    //     loader: "eslint-loader",
    //     include: path.resolve(__dirname, '../'),
    //     exclude: /node_modules/
    //   }
    // ],
		loaders: [
			{
                test: /\.vue$/,
                loader: 'vue-loader'
			},
			{
				test: /\.css$/,
				// loader: extractCSS.extract(['css','sass'])
				loaders: ['style', 'css']
			},
			{
				test: /\.scss$/,
				// loader: extractCSS.extract(['css'])
				loaders: ['style', 'css', 'sass']
			},
			{
				test: /\.(png|jpg)$/,
				loader: 'url?limit=40000'
			}
      // ,{
      //   test: /\.js$/,
      //   loader: "eslint-loader",
      //   include: path.resolve(__dirname, '../'),
      //   exclude: /node_modules/
      // }
		]
	},
	devtool: 'eval-source-map',
	externals: {
		jquery: 'window.$', // 暴露全局jQuery变量
		$: 'window.$', // 暴露全局jQuery变量
		moment: 'window.moment'
	},
	// eslint: {
	// 	// formatter: require('eslint-friendly-formatter')
	// },
	plugins: [
		new webpack.ProgressPlugin(function handler(percentage, msg) {
			if (percentage==0) {
				console.log(logTime(),'开始编译');
			}

			if (percentage==1) {
				console.log(logTime(),'结束编译');
			}
		}),
		// new NyanProgressPlugin({
		// 	// 获取进度的时间间隔，默认 180 ms
		// 	debounceInterval: 60,
		// 	nyanCatSays (progress, messages) {
		// 		if (progress === 1) {
		// 			// 当构建完成时，喊出「呦，又在写 Bug 了？」
		// 			return '呦, 又在写Bug了?'
		// 		}
		// 	}
		// }),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
	]
};

function copyDistToDocs() {
	// windows 复制文件夹命令 xcopy . - bobWu 的 学习日记 - 博客频道 - CSDN.NET  http://blog.csdn.net/bobwu/article/details/6605248
	var copyCmd = 'xcopy ';
	exec();
}

function logTime(){
	var time = new Date();
	return '[' + time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds() + ']';
}

//https://segmentfault.com/a/1190000004505747#articleHeader4

