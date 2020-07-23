### React中的新特性
#### Context

+ 定义：Context提供了一种方式，能够让数据在组件树中传递而不必一级一级动手传递
+ 结构：Provider提供数据，Consumer去使用数据
+ 简单使用Context
  ```jsx
  <!-- 通过createContext创建Context实例对象 -->
  import React, { Component, createContext } from 'react';
  // createContext(defaultValue)创建一个Context实例对象
  // defaultValue放的是默认值
  // 当Consumer找不到与之匹配的Provider，不会报错，会显示默认值
  const BatteryContext = createContext(30);
  const OnlineContext = createContext();
  class Mini extends Component {
    render() {
      return (
        // BatteryContext.Consumer中写的是一个函数
       /*  <BatteryContext.Consumer>
          {
            battery => <h1>Battery:{battery}</h1>
          }
        </BatteryContext.Consumer> */
        // 嵌套两个context
        <BatteryContext.Consumer>
          {
            battery=>(
              <OnlineContext.Consumer>
                {online=><h1>Battery:{battery},Online:{String(online)}</h1>}
              </OnlineContext.Consumer>
            )
          }
        </BatteryContext.Consumer>
      )
    }
  }
  class Middle extends Component {
    render() {
      return <Mini></Mini>
    }
  }
  class App extends Component {
    state = {
      battery: 60,
      online:false
    }
    render() {
      const { battery,online } = this.state;
      return (
        // context必须要有值
         <BatteryContext.Provider value={battery}>
          <OnlineContext.Provider value={online}>
          <button
            type="button"
            onClick={() => this.setState({ battery: battery - 1 })}>
            press
          </button>
          <button
            type="button"
            onClick={() => this.setState({ online: !online })}>
            switch
          </button>
          <Middle></Middle>
          </OnlineContext.Provider>
        </BatteryContext.Provider>
      )
    }
  }
  export default App;
  ```
  
+ 效果图

![image-20200719184903093](F:\CODE\ReactHooksProject\ticket\README.assets\image-20200719184903093.png)

​	点击press，Battery的值就减少1，点击switch，online的值取反

==注意==：如果只有一个Context，使用contextType会更加简单方便，把上面Mini组件修改一下就行

```jsx
class Mini extends Component {
  // 如果只是一个Context，可以使用contextType，代码比较简单
  static contextType=BatteryContext;
  render() {
    const battery= this.context;
    return (
      // BatteryContext.Consumer中写的是一个函数
      /*  <BatteryContext.Consumer>
        {
          battery => <h1>Battery:{battery}</h1>
        }
      </BatteryContext.Consumer> */
      // 使用contextType
      <h1>Battery:{battery}</h1>
    )
  }
}
layz和Suspense实现延迟加载
```

#### layz和Suspense实现延迟加载

```jsx
import React, { Component, lazy ,Suspense} from 'react';
import './App.css';
// lazy的返回值就是一个react组件
const About= lazy(()=>import("./about.jsx"));
// ErrorBoundary错误拼接，是一个捕获渲染后台错误的组件
// 利用生命周期函数componentDidCatch方法实现
class App extends Component {
  state={
    hasError:false
  }
 /*  componentDidCatch(){
    this.setState({
      hasError:true
    })
  } */
  // 也可以用一个静态方法
  static getDerivedStateFromError(){
    // 这个方法返回的是一个新的state数据，会合并到新的state中
    return {
      hasError:true
    }
  }
  render() {
    if (this.state.hasError){
      return <div>error</div>
    }
    return (
      // fallback的值是一个jsx
      // Suspense没有办法处理加载失败的情况
      <div>
        <Suspense fallback={<div>loading</div>}>
        <About></About>
        </Suspense>
      </div>
    )
  }
}
export default App
```

```jsx
import React,{Component} from 'react';
 export default class About extends Component{
    render(){
        return(
            <div>About</div>
        )
    }
}
```
#### memo实现指定组件进行渲染

+ 使用shouldComponentUpdate实现页面的条件渲染

  ```jsx
  import React, { Component, PureComponent, memo } from 'react';
  
  /* class Foo  extends PureComponent{
    // 判断该组件是否重新渲染
    // 通过生命周期函数可以去判断，也可以通过PureComponent实现
    // shouldComponentUpdate(nextProps,nextState){
    //   if(nextProps.name===this.props.name){
    //     return false;
    //   }
    //   return true
    // }
    render(){
      console.log('Foo render')
    return <div>{this.props.person.age}</div>;
    }
  } */
  const Foo = memo(function Foo(props) {
    console.log('Foo render')
    return <div>{props.person.age}</div>;
  })
  class App extends Component {
    state = {
      count: 0,
      person: {
        age: 1
      }
    }
    callback = () => {
  
    }
    // 当count发生变化的时候，Foo组件会被重新渲染
    render() {
      const { person } = this.state
      return (
        <div>
          {/* <button onClick={()=>this.setState({
            count:this.state.count+1
          })}>add</button> */}
          <button onClick={() => {
            person.age++;
            this.setState({ count: this.state.count + 1 })
          }}>
            add
          </button>
          {/* 当我们给Foo传入一个内联函数的时候，即使person.age没有发生改变，也是会重新渲染 */}
          {/* <Foo person={person} cb={()=>{}} /> */}
          {/* 把传入的内联函数写成回调函数，就可以解决,就不会重新渲染 */}
          <Foo person={person} cb={this.callback} />
        </div>
      )
    }
  }
  export default App;
  ```

  







