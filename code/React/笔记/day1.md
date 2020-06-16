### 初识React
+ React的特点：声明式、组件化、一次学习，随处编写、单项数据流、高效和Vue一样，使用虚拟dom。
+ React是一种思想：
  + react.js和Vue.js一样是用来写webapp
  + reactNative 是写原生app
+ 声明式和命令式：
  + 声明式：虚拟DOM arr.forEach((item,index)=>{})
  + 命令式：操作DOM for(let i=0; i<10; i++){...}
+ 引入相关的库：
  + react.js 是react的核心库
  + react-dom.js  提供操作dom的react护展库
  + babel.js 解析jsx语法为纯js语法（js高级语法转成js低级语法）
### 虚拟DOM
真实DOM：页面上每一个元素都是一个对象，对象是属性的无序集合，一个元素对象是特别庞大的，这个元素对象就是真实DOM，操作真实DOM，性能非常底下。  
虚拟DOM：使用JS对象模拟一个DOM元素，虚拟DOM对象中，没有过多的属性，操作时，非常简单，有很多算法，等虚拟DOM操作完毕后，再渲染成真实DOM。
虚拟DOM说白了就是一个JS对象。
    创建虚拟DOM：
        React.createElement('h1',{id:"xxx"},'hello');
最终虚拟DOM还是需要转化成真实DOM，因为浏览器只认识真实DOM。
写代码时，我们只需要操作虚拟DOM相关的数据，react会帮我们自动转换，数据变了，视图就会更新，我们不需要管，react都我们我们处理好的。
### JSX
+ jsx 即JavaScript XML
+ 什么是XML：客户端和服务器端通常的数据格式，现在用的是json这种数据格式。
+ jsx 的本质还是React.createElement()写法的语法糖。
写了一个`JSX：let vDOM = <h1>hello jsx</h1>`  如何理解？
   1）它不是字符串，也不是html，你可以叫它为jsx元素，或叫虚拟DOM。
   2）它需要知道最终它会产生一个JS对象，因为虚拟DOM就是一个JS对象。
JSX中可以写任意的HTML标签，可以写任意的HTML标签中的属性。
+ babel.min.js的作用
浏览器肯定是不能识别jsx代码，需要通过babel转译成js代码，如果要在script标签中写JSX代码，需要指定 type="text/babel"，否则会报错（script标签的默认类型是text/javascript）。
+ 虚拟DOM渲染成真实DOM
通过ReactDOM.render()就可以实现。
ReactDOM.render(参数一，参数二)  render函数里面有两个参数：
        参数一：通过js或jsx创建的虚拟DOM
        参数二：用来包含虚拟DOM的真实DOM，通过就是一个DOM
  ```
  <div id="app"></div>
      <script type="text/babel">
          // 创建一个jsx 虚拟DOM
          let vDOM=<h1>欢迎学习React...</h1>
          //把虚拟DOM渲染到页面上，变成真实DOM
          ReactDOM.render(vDOM,document.getElementById("app"))
    </script>
  ```
### 动态展示列表
```
<div id="app"></div>
    <script type="text/babel">
        let data=["angular","vue","react"]
        let a="xxx"
        let h111 = (
            <div>
            <h2>前端常见的js框架列表</h2>
            <ul>{
                /* data.map((item,index)=>{
                    return <li key={index}>{item}</li>
                    // return <li>{item}</li> 如果不加key会报错，页面正常显示
                }) */
                //可以简写为
                data.map((item,index)=><li key={index}>{item}</li>)
            }</ul>
            </div>
        )
        ReactDOM.render(h111,document.getElementById("app"))
    </script>
```
### 定义组件
在React中定义组件有两种方式，一种是通过函数function定义，一种是通过类class定义。
+ 通过函数定义组件
```
 <div id="app"></div>
    <script type="text/babel">
        // 通过函数的形式定义组件
        function MyComponent(){
            return(
                <div>
                    <h2>我是通过函数创建组件，是没有状态的</h2>
                    <Hi></Hi>
                </div>
            )
        }
        function Hi(){
            return(
                <h3>这是一个Hi组件</h3>
            )
        }
        ReactDOM.render(<MyComponent />,document.getElementById("app"));
    </script>
```
+ 通过类定义组件
  + 注意细节：
    1）需要继承React.Component
    2）通过render渲染一个jsx
    3）渲染标签时，首字母是小写，它当成html标签，如果没有html标签  就报错了。
    4）如果遇到了一个标签是大写，它会当成组件。组件名首字母通常大  写 。
    5）jsx中需要使用一个根标签包起来
```
<div id="app"></div>
    <script type="text/babel">
       class MyComponent extends React.Component{
           render(){
               return(
                   <div>
                   <h1>我们通过类创建组件</h1>
                   <Haha />
                   </div>
               )
           }
       }
       class Haha extends React.Component{
           render(){
               return <p>Haha 组件</p>
           }
       }
        ReactDOM.render(<MyComponent />,document.getElementById("app"));
    </script>
```
  + 注：1）组件名必须首字母大写
        2）虚拟DOM元素只能有一个根元素
        3）虚拟DOM使用时，可以使用双标签，也可以使用单标签，但是必须有结束的/ 
  + render函数在渲染类组件标签中的基本流程：
    1）React内部会创建组件实例对象，因为一个虚拟DOM就是JS对象
    2）调用render()得到虚拟DOM，解析成真实DOM
    3）插入到指定页面元素的内部
 ### React中操作状态
 + 初始化状态
   ```
   constructor(props){
            super(props)
            this.state = {
                num:10,
                price:5
            }
        }
    ```
  + 获取状态
    通过`this.state.num`
  + 更新状态
    通过`this.setState({num:100})`
  + 注：
    1）一个类中jsx或constructor中的this表示当前组件对象
    2）类中的有方法，方法中的this是undefined。你想让方法中的this也是组件对象，通过bind进行绑定或使用箭头函数。
  ```
  <div id="app"></div>
    <script type="text/babel">
       class MyComponent extends React.Component{
           constructor(props){
               super(props)
               this.state={
                   isHot:false
               }
               // 让clickHandle中的this指向组件对象
               this.clickHandle = this.clickHandle.bind(this)
           }
           clickHandle(){
               console.log(this)
               let { isHot } = this.state
                this.setState({
                    isHot:!isHot
                })
           }
           render(){
            let { isHot } = this.state
                // return <h1>今天天气很{this.state.isHot?"炎热":"凉爽"}</h1>
                return <h1 onClick={this.clickHandle}>今天天气很{isHot?"炎热":"凉爽"} </h1>
            }
           }
      
        ReactDOM.render(<MyComponent />,document.getElementById("app"));
    </script>
  ```
### ref的使用
+ ref的基本使用
    1）在标签上写一个ref="xxx"  在方法中通过this.refs.xxx获取此DOM元素
    2）ref的值也可以是回调函数  ref={ (abc)=>{  } }    abc表示当前的dom元素  可以把dom元素挂载到组件对象上
    3）通过 myRef = React.createRef(); 创建一个容器，在标签上使用myRef, ref={ this.myRef }，在方法中通过this.myRef.current获取DOM元素
  + 标签上写一个ref="xxx"
  ```
  <div id="app"></div>
     <script type="text/babel">
        class MyComponent extends React.Component{
            clickHandle =()=>{
                // 通过this.refs.inp.value 获取框中的内容
                alert(this.refs.inp.value)
            }
            blurHandle =(event)=>{
                // event 是事件对象
                alert(event.target.value)
            }
            render(){
                return(
                    <div>
                        <input type="text" ref="inp"/>
                        <input type="text" placeholder="失去焦点获取输入框中的内容" onBlur={this.blurHandle}/>
                        <button onClick={this.clickHandle}>获取输入框中的内容</button>
                    </div>
                )
            }
        }
        ReactDOM.render(<MyComponent/>,document.getElementById("app"));
     </script>
  ```
  + ref后面跟回调函数
  ```
  <div id="app"></div>
     <script type="text/babel">
        class MyComponent extends React.Component{
            clickHandle =()=>{
                alert(this.xxx.value)
            }
            blurHandle =(event)=>{
                alert(event.target.value)
            }
            render(){
                return(
                    <div>
                        <input type="text" ref={ (inp)=>{ this.xxx=inp } }/>
                        <input type="text" placeholder="失去焦点获取输入框中的内容" onBlur={this.blurHandle}/>
                        <button onClick={this.clickHandle}>获取输入框中的内容</button>
                    </div>
                )
            }
        }
        ReactDOM.render(<MyComponent/>,document.getElementById("app"));
     </script>
  ```
  + 创建一个容器
  ```
   <div id="app"></div>
     <script type="text/babel">
        class MyComponent extends React.Component{
            // 此处的myRef也是组件对象对象的属性  获取时通过this.myRef来获取
            myRef = React.createRef(); // 创建一个容器
            clickHandle =()=>{
                // console.log(this.myRef) // {current: input}
                alert(this.myRef.current.value)
            }
            blurHandle =(event)=>{
                alert(event.target.value)
            }
            render(){
                return(
                    <div>
                        <input type="text" ref={ this.myRef }/>
                        <input type="text" placeholder="失去焦点获取输入框中的内容" onBlur={this.blurHandle}/>
                        <button onClick={this.clickHandle}>获取输入框中的内容</button>
                    </div>
                )
            }
        }
        ReactDOM.render(<MyComponent/>,document.getElementById("app"));
     </script>
  ```