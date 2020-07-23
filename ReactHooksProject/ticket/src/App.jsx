import React, { Component, PureComponent, memo } from 'react';
// PureComponent在状态中的内容相对复杂的时候
// 可能就会不起作用，state中的第一级内容发生改变时，才会变化
// 而我们修改的是person对象中的age，会认为状态并没有发生改变，不会重新渲染
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
