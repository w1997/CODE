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
    this.props.store.subscribe(()=>{
      console.log(this.props.store.getState())
  })
  }
  decrement=()=>{
    let value=this.myRef.current.value;
    this.props.store.dispatch(createDecrementAction(value*1))
    this.props.store.subscribe(()=>{
        console.log(this.props.store.getState())
    })
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
