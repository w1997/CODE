### 通过脚手架使用Redux,完成简单计数
1)创建一个项目 create-react-app myreudex
2)安装redux npm i redux -S
3)在src文件下创建一个redux文件夹，在redux文件夹中创建下面的.jsx文件。
+ anction_creator.jsx
  ```
    import {INCREMENT,DECREMENT} from "./action_types"
    //创建action_creator,可以转换成箭头函数
    /* function createIncrementAction(value){
        return{
            type:INCREMENT,
            data:value
        }
    } */
    export const createIncrementAction=value=>({type:INCREMENT,data:value})
    export const createDecrementAction=value=>({type:DECREMENT,data:value})

  ```
+ anction_types.jsx
  ```
  export const INCREMENT ="INCREMENT"
  export const DECREMENT ="DECREMENT"
  ```
+ store.jsx
  ```
    //引入compose
    import {createStore,compose}from "redux"
    import reducer from "./reducer"
    //配置redux-devtools
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    export default createStore(reducer, composeEnhancers());

  ```
+ reducer.jsx
  ```
  import {INCREMENT,DECREMENT} from "./action_types"
  let initState=0;//设置初始化状态
  export default function reducer(preState=initState,action){
      const{type,data}=action;
      switch(type){
          case INCREMENT:
              return preState+data;
          case DECREMENT:
              return preState-data;
          default:
              return preState;
      }
  }
  ```
4）在scr文件中创建App.js和index.js文件
+ App.js
    ```
    import React, { Component } from 'react';
    import { createDecrementAction,createIncrementAction } from './redux/action_creator';
    class App extends Component{
      myRef = React.createRef();
      componentDidMount(){
        console.log(this.props.store)
      }
      increment=()=>{
        //this.myRef.current.value
        let value=this.myRef.current.value;
        this.props.store.dispatch(createIncrementAction(value*1))
        //订阅
       /*  this.props.store.subscribe(()=>{
          console.log(this.props.store.getState())
      }) */
      }
      decrement=()=>{
        let value=this.myRef.current.value;
        this.props.store.dispatch(createDecrementAction(value*1))
        /* this.props.store.subscribe(()=>{
            console.log(this.props.store.getState())
        }) */
      }
      incrementAsync=()=>{
        let value=this.myRef.current.value;
        setTimeout(()=>{
          this.props.store.dispatch(createIncrementAction(value*1))
        },2000)
      }
      decrementAsync=()=>{
        let value=this.myRef.current.value;
        setTimeout(()=>{
          this.props.store.dispatch(createDecrementAction(value*1))
        },2000)
      }
      render(){
        let count =this.props.store.getState();
        return (
        <div>
          <h3>这是app组件，当前计数是{count}</h3>
          <select ref={this.myRef}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
          <button onClick={this.increment}>同步 加</button>
          <button onClick={this.decrement}>同步 减</button>
          <button onClick={this.incrementAsync}>异步 加</button>
          <button onClick={this.decrementAsync}>异步 减</button>
        </div>

        )
      }
    }

    export default App;

    ```
+ index.js
    ```
    import React from 'react';
    import ReactDOM from 'react-dom';
    import App from './App';
    import store from "./redux/store"
    ReactDOM.render(
      <React.StrictMode>
        <App store= {store} />
      </React.StrictMode>,
      document.getElementById('root')
    );
    //页面上的状态跟着改变
    store.subscribe(()=>{
      ReactDOM.render(
        <React.StrictMode>
          <App store= {store} />
        </React.StrictMode>,
        document.getElementById('root')
      );
    })

    ```
### object.assign作用
 object.assign作用:将后面的对象添加到第一个对象上，并作为结果返回。(如果后面的对象与前面的对象中有相同的属性，后面对象中的属性值会把前面对象中的属性值覆盖)
例如：(1) let ol={a:1,b:2}
object.assign(ol,{b:2},{c:3})
结果是{a:1,b:2,c:3}
(2)let ol={a:1,b:2}
object.assign(ol,{b:3},{c:4})
结果是{a:1,b:3,c:4}
### 在理解代码中遇到的问题
1）字符串*1 可以得到数字
例："123"*1 ==> 123
2）{}里面放的是键值对，当键和值一样时{todos：todos}，可以缩写成{todos}
### 纯函数
纯函数是指：同样的输入，必定得到同样的输出（例：传入旧状态是一个对象中包含数组，输出新状态也是一个对象中包含数组，且数组所对应的键要一样，数组名可以不一样）
  注意：不能出现如下代码：
      1)不能和时间相关
      2)不能出现DOM操作，fs操作
      3)不能修改参数
      4)不能调用系统API，DOM操作，HTTP请求
      5)不能调用Date.now或Math.randow等不纯的方法
### 不用脚手架,写一个todo的简单应用
  + 基本步骤,需要导入redux.js
    1）准备状态
    ```
    let initState={
            todos:[
                {text:"学习VUE",done:false},
                {text:"学习React",done:true},
                {text:"学习JS",done:false},
            ],
            visibility:"all"
        }
    ```
    2）准备action creator
    ```
    function addTodo(text){
            return{
                type:"ADD_TODO",
                text
            }
        }
        function toggleTodo(todo){
            return{
                type:"TOGGLE_TODO",
                todo
            }
        } 
        function setVisibility(fliter){
            return {
                type:"SET_VISIBILITY",
                fliter
            }
        }
    ```
    3）准备reducer
    function reducer(state=initState,action){
            switch(action.type){
                case "ADD_TODO":
                    var abc=[...state.todos,{text:action.text,done:false}];
                    return Object.assign({},state,{todos:abc});
                case "TOGGLE_TODO":
                    var a=state.todos.map((item)=>{
                        if(item ==action.todo){
                            return Object.assign({},item,{done:!item.done})
                        }
                        return item
                    })
                     //{}里面放的是键值对，当键和值一样时{todos：todos}，可以缩写成{todos}
                    return Object.assign({},state,{todos:a});
                case "SET_VISIBILITY":
                    return Object.assign({},state,{visibility:action.fliter})
                default:
                    return state
            }
        }
    4）创建store
      `let store=Redux.createStore(reducer);`
    5）使用store
      `console.log(store.getState())`
    6）订阅
      ```
      store.subscribe(()=>{
            console.log(store.getState())
        })
      ```
    7）修改状态 
      ```
      store.dispatch(addTodo("学习小程序"));
      store.dispatch(toggleTodo(store.getState().todos[2]));
      store.dispatch(setVisibility("completed"))

    ```
### 概念笔记  
想要动态变换，向reducer发送指令的是action，action可以携带数据；
+ action和action creator是有区别的
  1）action和action creator这两个概念是不一样的。action就是一个普通的对象，必须要有一个type属性。action creator是一个函数，用来生成action对象。
  2）在action对象中，除了type属性是写死的，其它的结构，完全由开发者定义。
### 利用redux，react，react-redux写一个简单的计数器
1）创建一个reduxstu项目 create-react-app reduxstu
2）在src文件夹下创建actions、components、containers、reducers、store文件夹，App.js、index.js文件
在actions文件下创建counter.js文件
在components文件夹下创建Add.js、Show.js、Sub.js文件
在containers文件夹下创建Counter.js文件
在reducers文件夹下创建counter.js和index.js文件
在store文件夹下创建index.js文件




