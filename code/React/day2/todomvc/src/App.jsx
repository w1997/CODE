import React,{Component} from 'react';
import AddTodo from "./components/AddTodo"
import TodoList from "./components/TodoList"
import Footer from "./components/Footer"
import './style/todo-mvc.css'
class App extends Component{
    state={
    todos:[
      {content:"学习JavaScript",complete:false},
      {content:"学习Vue",complete:true},
      {content:"学习React",complete:false},
    ]
  }
  //添加todo任务
  addTodo(todo){
    this.state.todos.push(todo);
    this.setState({
      todo:this.state.todos
    });
  }
  //删除todo任务
  deleteTodo(todo){
    let index=this.state.todos.findIndex(t=>t ==todo);
    this.state.todos.splice(index,1);
    this.setState({
      todos:this.state.todos
    })
  }
  render(){
    return(
      <section className="todoapp">
        <AddTodo addTodo={this.addTodo.bind(this)}> </AddTodo>
        <TodoList todos={this.state.todos}></TodoList>
        <Footer></Footer>
      </section>
    )
  }
}

export default App;
