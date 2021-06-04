# 基于vue-cli3生成多页的前端项目
此项目前端本地开发使用node配合webpack开发，线上直接拷贝dist目录下的文件放到服务器上即可，接口使用通过nginx代理

## 项目目标
1. 在开发阶段，尽可能的少写代码。为此引入了简化html代码的pug模板，[Pug语法说明](https://www.pugjs.cn/api/getting-started.html)；可以显著提升CSS书写效率的预处理工具stylus，[Stylus读法](https://www.stylus-lang.cn/)
2. 上线后打包优化到最小。为此目标，首先所有页面采用vue的多页面配置方式，各个页面只生成自己的Html。所有js库文件，插件都从外部加载，不通过npm安装的方式来产生跟业务没有关联的js文件。

##### 已完成功能：
1. 纯静态html直接在src/html/common目录创建，样式可以直接放到页面内部。这类页面针对于404，500，协议页，说明页，帮助页等。
2. 其他多页类的页面，在pages下创建。定制的main.js在js/pages/{{demo}}/下面，{{demo}}跟pages下的文件名必须同名，在此可以定制当前单页的main.js，如果不创建，默认使用系统创建的main.js。
3. public中的js/lib在本地开发时需要用到，可以再添加别的库文件
4. 新增支持移动端的flexble.js，在base.pug中引用，如果不想使用，可以新增一个base，不引用支持移动端的js。


##### 未完成功能：
1. vue.config.js中pages没有异步，第一次运行run dev会报错。需要再运行一次； 4-22已完成（解决方案：修改run dev参数，让其先生成views内的文件再运行vuecli-server）
2. public中的js/lib打包上线时需要上传到cdn，pug模板中需要根据环境加载不同的js库文件。
3. 深层次页面的生成问题。

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