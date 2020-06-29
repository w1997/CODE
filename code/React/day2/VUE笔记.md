### JSONPd的实现原理
+ 由于浏览器的安全性限制，不允许AJAX访问协议不同、域名不同、端口号不同的数据接口，浏览器认为这种访问是不安全的。
+ 可以通过动态创建script标签的形式，把script标签的src属性，指向数据接口的地址，因为script标签不存在跨域限制，这种数据获取方式，称作JSONP（注意：根据JSONP的实现原理，知晓，JSONP只支持GET请求）
+ 具体的实现过程：
    + 先在客户端定义一个回调方法，预定义对数据的操作；
    + 再把这个回调方法的名称，通过URL传参的形式，提交到服务器的数据接口；
    + 服务器数据接口组织好要发送给客户端的数据，再拿着客户端的传递过来的回调方法的名称，拼接出一个调用这个方法的字符串，发送给客户端去解析执行；
    + 客户端拿到服务器返回的字符串后，当作script脚本去解析执行，这样就能够拿到JSONP的数据了。
+ JS中的find()方法
    find()方法换回通过测试（函数内判断）的数据的第一个元素的值
    find()方法为数组中的每个元素都调用一次函数执行：
        当数组中的元素在测试条件时返回true时，find()返回符合条件的元素，之后的值不会在调用执行函数；
        如果没有符合条件的元素返回undefined
    注：find()对于空数组，函数是不会执行的
    注：find()并没有改变数组的原始值
+ JS中的forEach()方法
    forEach()方法用于调用数组中的每个元素，并将元素传递给回调函数。
    注：forEach()对于空数组是不会执行回调函数的。
+ 什么是按需加载
    按需加载是前端性能优化的一大措施，按需加载就是根据需要去加载资源。在JS中，我们一般通过一些用户行为或者定时任务去触发一些加载动作。
+ 为什么需要按需加载
    浏览器在同一时间屙屎我们内可以发出的请求数有限制，所以这也是我们采用第三方打包工具将多个文件打包为一个文件的意义。但是多个打包文件为一个文件时包有比较大，一次性下载下来的速度就比较慢，仍然会有刚进入单页面系统产生首页白屏的时间较长的情况。按需加载可较好的解决这些问题。
+ react中项目中设置ant的按需加载
    (1)创建一个项目
    `npm  create-react-app`
    (2)安装antd并引入
        安装`npm i antd`
        在src/App.js中引入antd
        `@import '~antd/dist/antd.css'`
        测试是否可用：修改 src/App.js，引入 antd 的按钮组件。
        ```
        import React,{Component} from 'react'
        import { Button } from 'antd';
        class App extends Component{
            render(){
                return(
                    <div>
                        <Button><Button>
                    </div>
                )
            }
        }
        ```
       (3)安装 craco 
       `npm i @craco/craco`
       (4)修改package.json文件
       ```
       "scripts": {
            + "start": "craco start",
            + "build": "craco build",
            + "test": "craco test",
            - "start":"react-scripts  start",
            - "build":"react-scripts  build",
            - "test": "react-scripts test",
        }
       ```
       注：如果想要看项目的效果，修改配置文件需要重新启动项目
       (5)在根目录下面创建一个craco.config.js,用于修改默认配置
       (6)自定义主题，先把.css,文件修改成.less,然后引用为less的文件
       (7)安装craco-less并修改craco.config.js文件
        `npm i craco-less`
        craco.config.js文件的修改
        ```
            const CracoLessPlugin = require('craco-less');
            module.exports = {
              plugins: [
                {
                  plugin: CracoLessPlugin,
                  options: {
                    lessLoaderOptions: {
                      lessOptions: {
                        modifyVars: { '@primary-color': '#1DA57A' },
                        javascriptEnabled: true,
                      },
                    },
                  },
                },
              ],
            };
        ```
        (8)在@primary-color可以修改主题的颜色，修改了配置文件，需要重新启动项目，就能看到效果
        常用的样式变量
            ```
            @primary-color: #1890ff; // 全局主色
            @link-color: #1890ff; // 链接色
            @success-color: #52c41a; // 成功色
            @warning-color: #faad14; // 警告色
            @error-color: #f5222d; // 错误色
            @font-size-base: 14px; // 主字号
            @heading-color: rgba(0, 0, 0, 0.85); // 标题色
            @text-color: rgba(0, 0, 0, 0.65); // 主文本色
            @text-color-secondary: rgba(0, 0, 0, 0.45); // 次文本色
            @disabled-color: rgba(0, 0, 0, 0.25); // 失效色
            @border-radius-base: 4px; // 组件/浮层圆角
            @border-color-base: #d9d9d9; // 边框色
            @box-shadow-base: 0 2px 8px rgba(0, 0, 0, 0.15); // 浮层阴影
            ```







