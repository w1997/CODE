import React, { Component } from 'react';
import Counter from "./containers/Counter"
import Movie from ".//containers/Movie"

class App extends Component{
  render(){
    return(
      <div>
        {/* <h3>App组件</h3>
        <Counter></Counter> */}
        <Movie></Movie>
      </div>
    )
  }
}
export default App;
