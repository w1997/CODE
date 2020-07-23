# 1.React简介
+ React起源于Facebook的内部项目，在2013年5月开源。
+ Angular 2009年 是谷歌， 采用mvc但是不支持组件化开发。
+ 清楚两个概念：
    + library（库）:小而巧就是库，只提供了特定的API；优点是船小好掉头，可以很方便的从一个库切换到另一个库；但是代码基本上不会改变。
    + Framework（框架）：大而全的是框架；框架提供了一整套的解决方案；所以，如果在项目中间，想要切换到另外的框架是比较困难的。
# 2.前端三大主流框架
+ Angular.js：出来的比较早
+ Vue.js:最火的（关注的人比较多）的一门前端框架，是由中国人开发的，文档对我们来说相对友好一点。
+ React.js：最流行的（用的人是比较多的）一门框架，因为它的设计很优秀。
# 2.React与Vue的比较
组件化方面
1.什么是模块化：是从代码逻辑的角度进行分析的，o把一些可复用的代码，抽离为单个的模块；便于项目的维护和开发。
2.什么是组件化：是从UI界面的角度来进行分析的；把一些可复用的UI元素，抽离为单独的组件；便于项目的维护和开发。
3.组件化的好处：随着项目规模的增大，手里的组件越来越多；很方便就能把现有的组件，拼接为一个完整的页面。
4.Vue是如何实现组件化的：通过.vue文件，来创建对应的组件：
    + template 结构
    + script 行为
    + style 样式
5.React是如何实现组件化的：React中有组件化的概念，但是并没有像Vue这样的组件模板文件；React中一切都是以JS表现的。
# 3.从其他角度分析React和Vue
+ 开发团队方面
    + React是有Facebook前端官方团队进行维护和更新的；因此，React的维护开发团队，技术实力比较雄厚。
    + Vue：第一版主要是由作者尤雨溪专门进行维护，后面的版本是以尤雨溪为主导的开发团队进行相关的开发和维护。
+ 社区方面
    + 在社区方面，React由于诞生的较早，所以社区比较强大，一些常见的问题、坑、最优解决方案，文档、博客在社区中都是可以很方便就能找到。
    + Vue是近两年才火的，它的社区相对比较小，可能有些坑，没有人踩过。
+ 移动APP开发体验方面
    + Vue，结合Weex这门技术，提供了迁移到移动端APP开发的体验（Weex,目前只是一个小的玩具，并没有很成功的大案例）
    + React，结合ReactNactive，也提供了无缝迁移到移动App的开发体验（RN用的比较多，也是最火流行的）
# 4.为什么要学习React
1.和Angular1相比，React设计很优秀，一切基于JS并且实现了组件化开发的思想；
2.开发团队实力强悍，不必担心断更的情况；
3.社区强大，很多问题都能找到相应的解决方案；
4.提供了无缝转到ReactNative上的开发体验，让我们技术能力得到了拓展；增强了我们的核心竞争力；
5.很多企业中，前端项目的技术选型采用的是React.js

# 5.React 中的几个核心的概念

### 虚拟DOM

+ DOM的本质是什么：浏览器中的概念，用JS对象来表示页面上的元素，并提供了操作DOM对象的API；

+ 什么是React中的虚拟DOM：是框架中的概念，是程序员用JS对象来模拟页面上的DOM操作和DOM嵌套；

+ 为什么要实现虚拟DOM（虚拟DOM的目的）：为了实现页面中，DOM元素的高效更新

+ 使用虚拟DOM的本质和目的

  本质：用JS对象，来模拟DOM元素和嵌套关系

  目的：为了实现页面元素的高效更新

### Diff算法

+ tree diff：新旧两棵DOM树，逐层对比的过程，就是Tree Diff；当整棵DOM逐层对比完毕，则所有需要被按需更新的元素，必然能够找到；
+ component diff：在进行Tree Diff的时候，每一层中，组件级别的对比，叫做Component Diff；
   + 如果对比前后，组件类型相同，则暂时认为此组件不需要更新；
   + 如果对比前后，组件类型不相同，则需要移除旧组件，创建新组件，并追加到页面上；

+ element diff：在进行组件对比的时候，如果俩个组件类型相同，则需要进行元素级别的对比，这就叫做Element Diff。

  ![image-20200714151155267](F:\CODE\code\React\笔记\12简单复习react中的概念.assets\image-20200714151155267.png)



# 6.创建一个webpack4.0项目

1.运行npm init -y 快速初始化项目

2.在项目根目录创建src源码目录和dist产品目录

3.在src目录下创建index.html

4.使用cnpm安装webpack，运行cnpm i webpack webpack-cli -D

	+ 全局运行npm i cnpm -g

5.注意：webpack4.x提供了约定大约配置的概念；目的是为了尽量减少配置文件的体积

	+ 默认约定了：
	+ 打包的入口文件是src下index.js
	+ 打包的输出文件是dist下的main.js

# 7关于面试中react的简单总结

### 1）对React的基本理解

+ 什么是react

  动态构建用户界面的JS库

+ React的特点
  + 声明式编码
  + 组件化编码
  + 支持客户端与服务器渲染/编写原跨平台应用

+ React高效的原因

  虚拟DOM，不总是直接操作真实DOM（批量更新，减少更新的次数）

### 2）使用两种方式定义一个简单组件

+ 方式一：工厂函数（简单/无状态组件）

  function MyComponent1(props){

  ​	return <h1>无状态组件标题1111</h1>

  }

+ 方式二：ES6类（复杂/有状态组件）

  class MyComponet2 extends React.Component{

  ​	render(){  //回调函数，为组件对象提供虚拟DOM

  ​		return <h1>有状态组件标题2222</h1>

  ​    }

  }

### 3)区别类组件和函数式组件

+ 类组件：使用class定义的组件，会产生组件对象，可以有自身的状态和生命周期钩子
+ 函数组件：使用function定义的组件，不会产生组件对象，没有自身的状态和生命周期钩子

### 4)如何区别组件对象的3大属性

+ state：值为容器对象，保存的是组件内可变的数据，组件根据state中的数据显示，要更新界面只要更新state即可
+ props：值为容器对象，保存的是从组件外传递过来的数据，当前组件只读，父组件修改了自动显示新数据（其实就是父组件传递给组件的数据，子组件只能读取数据，并不能对数据进行修改）
+ refs：值为容器对象，保存的是n个有ref属性的dom元素对象，属性名是ref指定的标识名称，值为对应的dom元素

5）React组件化编码的3步与2个重要问题

+ 编码分3步

  1）拆分组件

  2）实现静态组件

  3）实现动态组件

  + 动态显示初始化数据
    + 类型
    + 名称
    + 保存在哪个组件

  + 交互

+ 2个重要问题

  + 状态数据保存在哪个组件？

    答：看是某个组件需要，还是某些组件需要（给父组件）

  + 更新状态数据的行为在哪个组件？

    答：状态在哪个组件，行为就定义在哪个组件

### 6）react组件的生命周期及钩子

+ 初始化阶段：
  + constructor()：创建组件对象的初始化方法
  + componentWillMount：组件即将被装载、渲染到页面上
  + render：组件在这里生成虚拟的DOM节点
  + componentDidMount:组件真正在被装载之后

+ 更新阶段
  + componentWillReceiveProps：组件即将更新不能修改属性和状态
  + render：组件重新描绘
  + componentDidUpdate：组件已经更新

+ 销毁阶段
  + componentWillUnmount：组件即将销毁

### 7）react应用中如何与后台通信

+ 通过ajax请求与后天交互，但react本身并不包含ajax语法封装，需要使用第三方ajax库
+ 可以使用axios/fetch来发送ajax请求
+ 发送请求的时机/位置：
  + 初始化请求：componentDidMount()
  + 用户操作后请求：时间毁掉函数或相关位置

### 8）比较react中组件间3种通信方式

+ 通过props传递

  缺点：只能一层一层地传递，兄弟组件必须借助父组件

+ 使用消息订阅（subscribe）--发布（publish）机制
  + 实现库：pubsub-js
  + 组件A：发布消息（相当于触发事件）
  + 组件B：订阅消息，接收消息，处理消息（相当于绑定事件监听）
  + 优点：对组件关系没有限制

+ 使用redux
  + 通过redux可以实现任意组件间的通信
  + 集中式管理多个组件共享的状态，而pubsub-js并不是集中式的管理

### 9）对react-router的简单认识

+ 下载：npm install --save react-router-dom

+ 是什么：用来实现SPA的react插件

+ 相关API：

  + 组件
    + <HashRouter>/<BrowserRouter>
    + <Route>
    + <Redirect>
    + <NavLink>/<Link>
    + <Switch>

  + 对象或函数
    + props.history 对象
    + props.match 对象
    + props.location 对象
    + withRouter函数

### 10）对redux的简单理解

+ redux是一个独立专门用于做状态管理的JS库（不是react插件库）
+ 可以与任何前端库配合使用，但最合适的是与react库配合
+ 作用：集中式管理react应用中多个组件共享的状态
+ 提供的API
  + createStore()
  + applyMiddleWare()
  + combineReducers()
  + store.getState()/dispatch()/subscribe()

### 11）redux的基本编码

+ redux

  + store.js  ---生成并暴露一个store管理对象
  + reducers.js
    + 包含n个reducer函数
    + 根据老state和指定action来产生返回一个新的state

  + action.js
    + 包含n个action creator函数
    + 同步action：返回一个action对象({type:'xxx',data:xxx})
    + 异步action：返回一个函数：dispatch=>{执行异步代理，结束时idispatch一个同步action}

  + action-types.js  --包含n个同步action的type名称常量

+ 入口JS  --<Provider store={store}>

+ 组件

  ```jsx
  export default connect(
  	state=>({xxx:state.xxx}),
      {action1,action2}
  )(UI组件)
  ```

  ###  12）为什么虚拟dom会提高性能

  虚拟dom相当于在JS和真实DOM中间加了一个缓存，利用dom diff 算法避免了没有必要的dom操作，从而提高性能。

  具体实现步骤如下：

  + 1）用JS对象结构表示DOM树的结构
  + 2）然后用这个树构建一个真正的DOM树，查到文档当中，当状态更新的时候，重新构造一棵新的对象树
  + 3）然后用新的树和旧的树进行比较，记录两棵树差异把2所记录的差异应用到步骤1所构建的真正的DOM树上，视图就更新了

  ### 13）DOM Diff 算法

  + 把树形结构按照层级分解，只比较同级元素。给列表结构的每个单元添加唯一的key属性，方便比较。
  + React只会匹配相同雷鸣的component合并操作，调用component的setState方法的时候，React将其标记为dirty
  + 在每个事件循环结束时，React检查所有标记dirty的component重新绘制。选择性子树渲染。
  + 开发人员可以重写shouldComponentUpdate提高diff的性能

### 14）调用setState之后发生了什么？

+ React会将传入的参数对象与组件当前的状态合并产生了新的state
+ 生成新的虚拟DOM树
+ 计算出新树与老树的节点差异，然后做真实DOM的差异更新

### 15）区别React中事件和原生的DOM事件

+ 为了解决跨浏览器兼容性问题，React会将浏览器原生事件封装为合成事件
+ React并没有直接将事件附着到子元素上，而是将事件绑定在了组件的根元素上（使用事件委托）