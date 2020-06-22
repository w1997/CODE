### React 中的路由
路由分类：
    后端路由：
    /students   ---->   json数据      api接口
    前端路由：
        浏览器中的路由   /goods   ---->   组件
对于react-router，有三个包:
    react-router:核心组件
    react-router-dom：应用于浏览器端的路由库（单独使用包含了react-router的核心部分）
    react-router-native 应用于native端的路由 
    其中：react-router-dom，react-router-native里面包含了react-router，如果要写web应用，一般只需要使用react-router-dom就可以了。
安装使用：npm i react-router-dom -S
+ 1)基本路由
会用到3个组件：Router组件、Route组件，Link组件
  + Router组件：该组件是一个容器，只能包含一个组件。在web开发，必须使用BrowserRouter，不是Router。换句话说，我们使用import 导入时，要import BrowserRouter。
    import { BrowserRouter as Router } from "react-router-dom"
    Router组件应用到App组件上。
        ```
        ReactDOM.render(
        <Router>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </Router>,
        document.getElementById('root')
    );
        ```
  + Route组件，它有几个重要的属性：
        path：表示路径，通常以/打头
        component:对应的载入哪个配件
        exact：表示是否精确匹配
        使用如下：
        ```
        import { Route } from "react-router-dom";  // App组件中引入
        <Route path="/" exact component={Home}></Route>
        <Route path="/list" component={List}></Route>
        <Route path="/user" component={User}></Route>
        ```
  + Link组件：使用Link组件，有一个to属性，点击时切换到哪个路径，写法如下：
    ```
    <ul>
        <li><Link to="/">首页</Link></li>
        <li><Link to="/list">列表页</Link></li>
        <li><Link to={{pathname:"/user",search:"?username=admin"}}>用户中心</Link></li>
    </ul>
    ```
+ 2）嵌套路由
所谓的嵌套路由，就是指在某个路由的组件中，再次使用路由。
在需要嵌套的组件中，再次使用如下两个组件：
  Route  定义规则 + 坑
  Link  
    ```
    <div>
        <h3>用户组件</h3>
        <ul>
            <li><Link to="/user/reg">注册</Link></li>
            <li><Link to="/user/login">登录</Link></li>
        </ul>
        <Route path="/user/reg" component={Reg}></Route>
        <Route path="/user/login" component={Login}></Route>
    </div>
    ```
+ 3）动态路由
针对一个路由，通过传入不同的参数，显示不同的内容。
如何实现动态路由，从3个方面实现：
    1）在Link组件中，使用/path/参数
    2）在定义Route中path时，增加/path/:参数名
    3）使用match的params获取参数，this.props.match.params.参数名
+ 4）编程式路由
所谓的编程式路由，就是通过js代码来实现的路由跳转。编程式路由好比html中，点击button，需要路转到某个页面，此时我们需要注册一个点击事件，然后通过某个方式进行所谓的路由跳转。
在react中如何实现编程式路由？
答：在通过 Route 标签渲染的组件中，可以使用this.props.history 实现编程式路由
<button onClick={ ()=>this.props.history.go(-1) }>返回</button>

  + 常用的api:
        history.push({pathname: '/three})
        history.push({pathname: '/three666?name=zs&sex=man'})
        history.go(-1)  返回上一级  
        history.goBack()  后退
        history.goForWard()  前进
+ 5）重定向：
    所谓的重定向，就是本来要访问a页面，结果跳转到b页面。需要用到Redirect组件，该组件有两个属性一个是from，表示你想要访问的页面，另一个是to，表示会跳转的页面
        `<Redirect from="/cart" to="/list"></Redirect>`
    当你访问/cart时，页面会跳转到/list。

+ 6）Switch组件：
    作用是在Route路由匹配是，只显示第一个匹配到的组件，后面任何匹配到的组件都不再显示。通常在Route组件外面包一个Switch组件。
### redux 的初步了解
+ redux是什么:
         这是一个状态管理机。追踪到状态的变化
         redux并不是专门应用到react的，你可以在任何地方使用，甚至你可以在原生js中使用redux，你还可以在jq中使用redux，你还可以在vue中使用redux。
         redux是一个独立的状态管理器。
+ 三大原则：
    1）单一数据源：整个应用state被存储在store中。
    2）state是只读的：只能获取状态，不能直接修改状态。
    3）通过reducer进行状态的修改：reducer需要接收一个指令（action），对于reducer来说，它要接收一个老状态和一个action，返回一个新的状态。

+ 使用redux：
    1）直接下载一个redux.js,然后在script标签中引入使用
    `<script src="./js/redux.js"></script>`
    2）在脚手架中使用
        redux的核心是仓库store，如何创建一个仓库：
            redux提供了一个叫createStore api就可以创建一个仓库。
        直接创建仓库时，需要给仓库配一个管理员，管理员叫reducer。
    `let store = Redux.createStore(reducer)`
        action:表示要执行的动作，本质是一个JS对象，但是这个对象必须要有一个叫type属性，用来描述这个动作。
        reducer：根据不同的action完成state的变化。reducer是一个函数，有两个参数，需要接收一个老状态和action，然后返回新的state。reducer必须要返回一个和初始状态有相同数据结的对象，不要直接修改state。必须要写上一个default，如果action处理不了，还是返回老状态。
    ```
    function reducer(state=initState, action){
        switch(action.type){  // 根据不同的action进行不同的操作
            case "INCREMENT":
                return {count:state.count+1};
            case "DECREMENT":
                return {count:state.count-1};
            default:
                return state;
        }
    }
    ```
    使用store：
        dispatch：用于派发某个action
        getState:获取状态
        subScribe:订阅，一旦状态发生变化，就会执行回调函数
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="./js/redux.js"></script>
</head>
<body>
    <script>
        //console.log(Redux);
        //创建仓库前，准备状态
        const initState={
            count:0
        }
        //准备action
        const increment={
            type:"INCREMENT"
        }
        const decrement={
            type:"DECREMENT"
        }
        //准备reducer
        function reducer(state=initState,action){
            switch(action.type){ // 根据不同的action进行不同的操作
                case "INCREMENT":
                    return {count:state.count+1};
                case "DECREMENT":
                    return {count:state.count-1};
                default:
                    return state;
            }
        }
        //配置redux-devtools
        const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; 
        let store = Redux.createStore(
            reducer,
            composeEnhancers()   // 启动redux调试
        );  //  Expected the reducer to be a function.
        // console.log(store)
        //订阅
        store.subscribe(()=>{
            // 只要state发生变化，就执行此处的代码
            console.log("现在的状态是：",store.getState())
        }) 
        //通过dispatch一个action完成状态的修改
        store.dispatch(increment);
        store.dispatch(increment);
    </script>
</body>
</html>
 ```
 `分析`：以store.dispatch(increment)简单分析它的执行流程：
   当执行store.dispatch(increment)代码时，就会调用reducer。此时，increment对象中的type是"INCREMENT",在调用reducer时会执行下面代码：return {count:state.count+1};老状态是{count:0},在+1后，返回新的对象{count:1}
    



