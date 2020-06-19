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
    ReactDOM.render(
        <Router>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </Router>,
        document.getElementById('root')
    );
  + Route组件，它有几个重要的属性：
        path：表示路径，通常以/打头
        component:对应的载入哪个配件
        exact：表示是否精确匹配
        使用如下：
        import { Route } from "react-router-dom";  // App组件中引入
        <Route path="/" exact component={Home}></Route>
        <Route path="/list" component={List}></Route>
        <Route path="/user" component={User}></Route>
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

常用的api:
    history.push({pathname: '/three})
    history.push({pathname: '/three666?name=zs&sex=man'})
    history.go(-1)  返回上一级  
    history.goBack()  后退
    history.goForWard()  前进
