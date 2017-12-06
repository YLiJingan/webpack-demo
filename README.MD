本次使用开发工具为 VSCode，相对webstrome能轻巧一些。这个小项目主要是webpack的demo

#### 起步
##### 第一次打包 
* `./node_modules/.bin/webpack src/index.js dist/bundle.js`   
* `./node_modules/.bin/webpack` 就可以找到node_modules下的webpack shell脚本脚本。照着官网上的例子输的，执行这句就报错了。尴尬了
* `webpack src/index.js dist/bundle.js`执行这句打包成功。      
    上述命令结束说明:     
    `webpack {entry file} {destination for bundled file}`       
    <img src="http://ow4f5k7el.bkt.clouddn.com/firstBundle.png" width = "450" height = "180" alt="first_bundle" align=center />

  * 查阅相关资料，发现是全局安装和本地安装的问题。            
  <img src="http://ow4f5k7el.bkt.clouddn.com/npmGInstall.png" width = "450" height = "180" alt="first_bundle" align=center />         
  我已经全局安装过webpack了，直接使用webpack执行就可以。由于官网推荐的是本地安装，使用命令./node_modules/.bin/webpack指定webpack的地址。       

##### webpack.config.js
  * 配置入口 出口文件     
      从上面的第一次打包过程我们发现，每次打包的时候都需要手动写入口文件和出口文件，使用webpack.config.js配置文件，我们就可以进行配置，之后直接执行webpack.       
      然而天不遂人愿，又报错了。       
      <img src="http://ow4f5k7el.bkt.clouddn.com/error_1.png" width = "550" height = "320" alt="first_bundle" align=center />       
      `path.resolve(_dirname,'dist')`是获取项目的绝对路径，需要将这里的dirname改为'./'       
  * npm脚本     
      package.json中 script 添加 "build":"webpack"       

#### 管理资源
> loader 让 webpack 能够去处理那些非 JavaScript 文件（webpack 自身只理解 JavaScript）。loader 可以将所有类型的文件转换为 webpack 能够处理的有效模块，然后你就可以利用 webpack 的打包能力，对它们进行处理。

##### 加载CSS
 `npm install --save-dev style-loader css-loader`     
  webpack.config.js中module配置中添加style-loader css-loader          
> webpack 根据正则表达式，来确定应该查找哪些文件，并将其提供给指定的 loader。在这种情况下，以 .css 结尾的全部文件，都将被提供给 style-loader 和 css-loader。
##### 加载图片      
`npm install --save-dev file-loader`        
webpack.config.js中module配置中添加file-loader        
##### 加载数据      
`npm install --save-dev csv-loader xml-loader`      
webpack.config.js中module配置中添加csv-loader xml-loader    

#### 管理输出   
* 设定 HtmlWebpackPlugin      
*如果我们更改了我们的一个入口起点的名称，甚至添加了一个新的名称，会发生什么？生成的包将被重命名在一个构建中，但是我们的index.html文件仍然会引用旧的名字。我们用 HtmlWebpackPlugin 来解决这个问题。*          
`npm install --save-dev html-webpack-plugin`        
webpack.config.js中plugins配置中添加HtmlWebpackPlugin，需要先引入html-webpack-plugin    
<img src="http://ow4f5k7el.bkt.clouddn.com/htmlwebpackplugin.png" width = "550" height = "320" alt="htmlwebpackplugin" align=center />        
* 清理/dist文件夹    
在上面的那张图中，可以看到我的dist文件夹现在是相当的杂乱，这还只是个小demo，clean-webpack-plugin是一个比较普及的管理插件。在每次重新构建之前，删除dist文件夹，构建的时候再重新生成。           
* npm install clean-webpack-plugin --save-dev     

#### 开发
* 使用source map
    * 为了更方便的追踪错误和警告，JS提供了source map功能，将编译后的代码映射回原始源代码。这个在Chrome的控制台中可以找到

* 开发工具
    * 每次要编译代码的时候，都需要手动运行npm run build 就会变的很麻烦。我们可以使用3中工具在代码发生变化之后进行自动编译         
    **webpack's Watch Mode**  
    **webpack-dev-server**  
    **webpack-dev-middleware**  
    * 使用观察模式   
        * package.json中添加用于启动webpack的观察模式的npm script脚本
        * npm run watch执行之后，wenpack会一直观察文件，当发生变化时，自动重新编译。   
        * 缺点：代码是重新编译过的，但是我们要在浏览器中看到最新的代码的话，需要手动进行刷新   

    * 使用webpack-dev-server
      * webpack-dev-server为你提供了一个简单的web服务器，并且呢能够实时进行重新加载，这也是webpack-dev-server相比观察模式好的地方    
      * `npm install --save-dev webpack-dev-server`     
      * webpack.config.js中添加DevServer，设置可访问文件   
      * package.json中添加npm script脚本，可以直接运行开发服务器
      * 使用最为广泛    

    * 使用webpack-dev-middleware
      * 中间件容器     
      * `npm isntall --save-dev express webpack-dev-middleware`
      * webpack.config.js中output配置中添加publicPath   
      * 设置自定义的express服务，新建server.js       
      * package.json中添加npm script脚本 

这里有个问题?? 目前添加的npm script都是需要使用npm run XX来运行，只有webpack-dev-server 是直接使用npm start。这是为什么呢?