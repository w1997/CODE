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
    ],
    visibility:'all'
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
  //切换指定todo的状态
  toggleTodo(todo){
    let index=this.state.todos.findIndex(t=>t==todo);
    this.state.todos[index].complete=!this.state.todos[index].complete;
    this.setState({
      todos:this.state.todos
    });
  }
  //切换所有todo的状态
  toggleAll(done){
    this.state.todos.forEach(todo=>todo.complete=done);
    this.setState({
      todos:this.state.todos
    })
  }
  //根据todo的状态，得到是否全选的布尔值
  allChecked(){
    return this.state.todos.every(todo=>todo.complete)
  }
  //统计未完成的todos
  leftTodos(){
    return this.state.todos.filter(todo=>!todo.complete).length
  }
  //获取最终要显示的todos，根据todos和visibility计算得到
  filteredTodos(){
    switch(this.state.visibility){
      case 'all':
        return this.state.todos;
      case 'active':
        return this.state.todos.filter(todo=>!todo.complete)
      case 'completed':
        return this.state.todos.filter(todo=>todo.complete);
    }
  }
  //设置visibility
  setVisibility(filter){
    this.setState({
      visibility:filter
    })
  }
  //统计已经完成todo的数量
  finishTodos(){
    return this.state.todos.filter(todo=>todo.complete).length;
  }
  //清除已完成的todos
  clearCompleted(){
    let arr=this.state.todos.filter(todo=>!todo.complete);
    this.setState({
      todos:arr
    })
  }
  render(){
    return(
      <section className="todoapp">
        <AddTodo addTodo={this.addTodo.bind(this)}> </AddTodo>
        <TodoList 
          todos={this.filteredTodos()} 
          deleteTodo={this.deleteTodo.bind(this)}
          toggleTodo={this.toggleTodo.bind(this)}
          toggleAll={this.toggleAll.bind(this)}
          allChecked={this.allChecked()}
        ></TodoList>
        <Footer 
          leftTodos={this.leftTodos()}
          setVisibility={this.setVisibility.bind(this)}
          visibility={this.state.visibility}
          finishTodos={this.finishTodos()}
          clearCompleted={this.clearCompleted.bind(this)}
        ></Footer>
      </section>
    )
  }
}

export default App;
