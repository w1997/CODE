react.js 用来构建用户界面
redux 集中式状态管理JS库，通常配合使用；基于redux也有些状态管理JS库
如何把react和redux结合起来使用：react-redux
react-redux：
    两类：1)展示型组件
    2）容器型组件也可以说成智能型组件（需要用状态）
    核心：
    1）connect方法 把展示型组件变成容器型组件
    2）Provider组件 让后代组件可以访问到store
    三个1：
        1个开发思想：smart组件，dumb组件
        1个方法：connect(mapStateToProps,mapDispatchToprops)(展示组件)
        1个组件 Provider组件
---------------------------------
react组件：
  App 
    | --Counter
            |--Show 
            |--Add   
            |--Sub    
-------------------
redux:
    1）准备store
    2）之前是使用store 现在需要在react中使用store
准备store
    action reducer ininState
### 关于export和export default的区别
ES6的模块化中，export和export default都可以用于导出常量、函数、文件、模块等，我们可以通过import进行导入
+ 使用
    1）export方式导出
        ```
        export function increment(){   
            return{
                type:"INCREMENT"
            }
        }
        export function decrement(){   
            return{
                type:"DECREMENT"
            }
        }  
        ```
    import 导入使用
    `import { increment,decrement} from "../actions/counter"`
    2)export default 方式导出
        ```
        export default function counter(state=0,action){
            switch(action.type){
                case "INCREMENT":
                    return state+1;
                case "DECREMENT":
                    return state-1;
                default:
                    return state;
            }
        }
        ```
    import导入使用
    `import counter from "./counter"`
注：export导出时，我们在用import导入时需要用{}，并且可以在{}中放多个；export default导出时我们可以在import后面直接用函数名就行。经过实践我发现let的变量不能直接`export default let store=createStore(reducer,state)`,可以直接用export。
### 中间件redux-thunk
1)首先，使用npm进行安装
`npm install --save redux-thunk`
2)使用applyMiddleware来使用thunk中间件

