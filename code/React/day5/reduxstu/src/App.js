import React, { Component } from 'react';
import Counter from "./containers/Counter"

class App extends Component{
  render(){
    return(
      <div>
        <h3>App组件</h3>
        <Counter></Counter>
      </div>
    )
  }
}
export default App;
