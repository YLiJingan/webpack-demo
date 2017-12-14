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
*如果我们更改了我们的一个入口起点的名称，甚至添加了一个新的名称，会发生什么？生成的包将被重命名在一个构建中，但是我们的index.html文件仍然会引用旧的名字。我们用 HtmlWebpackPlugin 来解决这个问题*                 
`npm install --save-dev html-webpack-plugin`        
webpack.config.js中plugins配置中添加HtmlWebpackPlugin，需要先引入html-webpack-plugin    
<img src="http://ow4f5k7el.bkt.clouddn.com/htmlwebpackplugin.png" width = "550" height = "320" alt="htmlwebpackplugin" align=center />                
* 清理/dist文件夹                 
在上面的那张图中，可以看到我的dist文件夹现在是相当的杂乱，这还只是个小demo，clean-webpack-plugin是一个比较普及的管理插件。在每次重新构建之前，删除dist文件夹，构建的时候再重新生成。                         
* `npm install clean-webpack-plugin --save-dev`     

#### 开发
* 使用source map(便于打包之后进行调试)
    * 为了更方便的追踪错误和警告，JS提供了source map功能，将编译后的代码映射回原始源代码。这个在Chrome的控制台中可以找到    
    **上线之前，需要删除devtool。**
    webpack.config.js中配置devtool选项,有4中模式：
        1. source-map:会减慢打包速度，在一个单独文件中产生一个完整其功能完全的文件，会提示第几行的哪里有错误。  打包完成之后，会生成一个.map独立文件
        2. cheap-module-source-map 也会生成独立的文件，会提示在第几行出现错误，但是不提示具体错误在这一行的哪里   
        3. eval-source-map 不生成独立的文件，打包速度比较快，有安全问题,会提示第几行的哪里有错误(开发阶段)     
        4. cheap-module-eval-source-map  不生成独立的文件，会提示在第几行出现错误，但是不提示具体错误在这一行的哪里(开发阶段)

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
    *npm start是npm run start的简写。可以使用npm run来运行scripts里的条目。*                 

#### 模块热替换
* 热更新(Hot Module Replacement)，是webpack提供的最有用的功能之一，解决了前端开发中修改代码后需要手动刷新浏览器的问题，它允许在运行的时候更新各种模块。        
> 不适用于生产环境，只能在开发环境中使用       
* 启用HMR     
    更新webpack-dev-server的配置     
    <img src="http://ow4f5k7el.bkt.clouddn.com/HMR.png" width = "550" height = "320" alt="htmlwebpackplugin" align=center />          


#### Tree Shaking       
***用于移除JS上下文中问未引用代码***  
* 未使用的代码依然存在bundle.js中，但是并没有被导出     
    * 对于上述的情况，在实际开发中我们希望打包之后，未使用的代码直接删除也不会存在bundle.js中,在这里可以使用压缩工具-UglifyJSPlugin   
        * `npm isntall --save-dev uglifyjs-webpack-plugin`  
        * webpack.config.js中plugins中添加配置
        * 在实际的开发中对于bundle.js会产生显著的体积优化

#### 生产环境构建     
> 开发环境(development)和生产环境(production)的构建目标差异很大。          

*在开发环境中，我们需要具有实时重新加载或者热更新的source map和loaclhost server*    *在生产环境中，我们需要更小的bundle，更轻量的source map，以及更优化的资源*        
我们写一个通用的配置文件，再分别针对开发环境和生产环境写各自的配置文件。为了将这些配置合并在一起，使用**webpack-merge**工具。     
`npm install --save-dev webpack-merge`      
在开发环境中使用inline-source-map,在生产环境中使用souce-map     
* 指定环境      
*通过与process.env.NODE_ENV 环境变量关联,判断是什么环境环境还是开发环境决定应该引用那些内容。* 
    * 使用webpack内置的DefinePlugin为所有的依赖定义这个变量 

#### 代码分离
*代码分离可以把代码分离到不同的bundle中，然后按需加载或并行加载。*       
* 入口文件      
    * 使用entry配置手动地分离代码      
    <img src="http://ow4f5k7el.bkt.clouddn.com/entrySperate.png" width = "450" height = "100" alt="htmlwebpackplugin" align=center />   
    * 缺点:如果入口chunks之间包含重复法人模块，重复的模块都会被引入到各个bundle中。从上图可以看到，我们在两个文件都引入了lodsh               
* 防止重复        
    * CommonsChunkPlugin插件可以将公共的依赖模块提取到已有的入口chunk中，或者提取到一个新生成的chunk.        

* 动态导入  
    动态代码拆分，有两个类似的技术。第一种也是优先选择的方式，使用import()语法；第二种是使用webpack特定的require.ensure.       

#### 懒加载             
*懒加载或者按需加载，是一种很好的优化网页或应用的方法。这样加快了应用的初始加载速度，减轻了它的总体积。*     
<img src="http://ow4f5k7el.bkt.clouddn.com/lazyload.png" width = "450" height = "230" alt="htmlwebpackplugin" align=center />   


#### 缓存     
*客户端从服务器请求资源是比较耗费时间的，只额就是为什么浏览器使用一种名问缓存的技术。可以使用命中缓存，以降低网络流量，是网站加载速度更快。但是在我们不熟新版本的时候不更改文件名，浏览器会认为它没有被更新，就会使用缓存版本。但是如何才能获取到新的代码呢？*        
* 输出文件的文件名  
    * 通过使用output.filename进行**文件名替换**，配置webpack.config.js中output模块，`filename:'[name].[chunkhash].js'`    
    <img src="http://ow4f5k7el.bkt.clouddn.com/chunkhash.png" width = "550" height = "220" alt="htmlwebpackplugin" align=center /> 
    <br/>
       **注意** 开发环境中只能使用[hash]，在生产环境中使用[chunkhash]，不能和热更新同时使用(然而热更新只是在开发环境中使用的) 
    <img src="http://ow4f5k7el.bkt.clouddn.com/hash.png" width = "550" height = "230" alt="htmlwebpackplugin" align=center />         
      
* 提取模板    
    *使用CommonsChunkPlugin在每次修改后的构建结果中，将webpack的样板和mainfest提取出来。通过指定entry配置中未用到的名称，这个插件会自动将我们需要的内容提取到单独的包中。*     


以上内容是对照官网进行的简单练习，知识点比较零散。在实际的开发中，需要结合实际的项目进行相关的配置。


#### PostCSS 
*自动处理CSS3属性前缀*      
`npm install --save-dev postcss-loader autoprefixer`
新建 post.config.css配置文件  module模块下的css文件中use增加 postcss-loader    
执行webpack，在dist文件夹中我们看到CSS3前缀已经自动加上
[postcss Loader](https://github.com/postcss/postcss-loader)

#### Babel
转换ES6、转换JSX     
安装依赖:`npm install --save-dev babel-core babel-loader bebel-preset-es2015 babel-preset-react`  
webpack.config.js中module中配置增加对js的Loader。也可以在根目录下增加.babelrc配置文件，配置`"presets":["react","es2015"] `        
执行webpack，在打包好的dist文件夹中可以看到es6,以及react中的jsx语法被转换。       

*转换es6,es7,es8*
`npm install --save-dev babel-preset-env`
修改presets 渲染器中的es2015为env


