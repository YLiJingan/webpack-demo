const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry:{
    index:'./src/index.js',   //配置入口文件，作为构建内部依赖图的开始
    //app:'./src/index.js',
    //print:'./src/print.js'
   },
    output:{                  //配置出口文件，webpack在哪里输出所创建的bundles,以及如何命名这些文件
        filename:'bundle.js',     //输出的文件名
        //filename:'[name].bundle.js',
        path:path.resolve('./','dist'),     //在哪里输出
        publicPath:'/'
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[
                    'style-loader',
                    'css-loader'
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
            }
        ]
    },
    plugins:[
        // new CleanWebpackPlugin(['dist']),
        // new HtmlWebpackPlugin({
        //     title:'Output Management'
        // })
    ],
    devtool:'inline-source-map',
    devServer:{
        contentBase:'./dist'     //告知webpack-dev-server，在localhost：8080下简历服务，并将dist文件夹作为可访问文件
    },
};