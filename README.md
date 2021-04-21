# 基于vue-cli3生成多页的前端项目
此项目前端本地开发使用node配合webpack开发，线上直接拷贝dist目录下的文件放到服务器上即可，接口使用通过nginx代理

目标：前端打包优化到最小。思路：所有js库文件，插件都从外部加载，不通过npm安装的方式来产生跟业务没有关联的js文件。所有页面分别打包，减少各自打包的文件大小。

已完成功能：
1、纯静态html直接在src/html/common目录创建，样式可以直接放到页面内部。这类页面针对于404，500，协议页，说明页，帮助页等。
2、其他多页类的页面，在pages下创建。定制的main.js在js/pages/{{demo}}/下面，{{demo}}跟pages下的文件名必须同名，在此可以定制当前单页的main.js，如果不创建，默认使用系统创建的main.js。
3、public中的js/lib在本地开发时需要用到，可以再添加别的库文件


未完成功能：
1、vue.config.js中pages没有异步，第一次运行run dev会报错。需要再运行一次；
2、public中的js/lib打包上线时需要上传到cdn，pug模板中需要根据环境加载不同的js库文件。
3、深层次页面的生成问题。

----
## 运行指南
**本地运行**
>第一步
npm install
>第二步
npm run dev

**线上运行**

>第一步
npm run build
>第二步
npm run upload