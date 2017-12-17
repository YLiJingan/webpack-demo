const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

console.log(encodeURIComponent(process.env.type));
if(process.env.type == "build"){
    var website = {
        publicePath:'http://192.168.91.1:9001'
    }
}else{
    var website = {
        publicePath:'http://www.angryyan.com:9001'
    }
}

module.exports = {
    devtool: 'source-map',
    entry:{
    index:'./src/index.js',   //配置入口文件，作为构建内部依赖图的开始
    //app:'./src/index.js',
    //print:'./src/print.js'
    another:'./src/another-module.js'
   },
    output:{                  //配置出口文件，webpack在哪里输出所创建的bundles,以及如何命名这些文件
        filename:'[name].[hash].js',     //输出的文件名
        //filename:'[name].bundle.js',
        path:path.resolve('./','dist'),     //在哪里输出
        publicPath:website
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[
                    'style-loader',
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test:/\.(png|svg}jpg|gif)$/,
                use:[
                    'file-loader'
                ]
            },
            {
                test:/\.(woff|woff2|eot|ttf|otf)$/,
                use:[
                    'file-loader'
                ]
            },
            {
                test:/\.(csv|tsv)$/,
                use:[
                    'csv-loader'
                ]
            },
            {
                test:/\.xml$/,
                use:[
                    'xml-loader'
                ]
            },{
                test:/\.(jsx|js)$/,
                use:{ 
                    loader:'babel-loader',
                    options:{
                        presets:['es2015','react']
                    }
                },
                exclude:/node_modules/
            }
        ]
    },
    plugins:[
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title:'Hot Module Replacement'
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        /*
        指定环境，webpack内置DefinePlugin NODE_ENV是一个由Node.js暴露给执行脚本的系统环境变量
        */
        new webpack.DefinePlugin({
            'process.env':{
                'NODE_ENV':JSON.stringify('deveploment')
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name:'common'   //指定公共 bundle的名称
        }),
        new webpack.ProvidePlugin({
            $:"jquery"
        }),
        new webpack.BannerPlugin('Yan')
    ],
    devtool:'inline-source-map',
    devServer:{
        contentBase:'./dist',     //告知webpack-dev-server，在localhost：8080下建立服务，并将dist文件夹作为可访问文件
        hot:true,
        port:9001
    },
    watchOptions:{
        poll:1000,   //监视时间，毫秒单位
        aggregeateTimeout:500,  //防止重复进行保存，打包出错
        ignored:/node_modules/,
    }
};