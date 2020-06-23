import React,{Component} from "react"
import PropTypes from "prop-types"
import Todo from "./Todo"

export default class TodoList extends Component{
    //验证规则
    static propTypes={
        todos:PropTypes.array.isRequired,
        deleteTodo:PropTypes.func.isRequired,
        toggleTodo:PropTypes.func.isRequired,
    }
    render(){
        return(
            <section className="main">
                <input type="checkbox"className="toggle-all" checked={this.props.allChecked}
                    onChange={e=>this.props.toggleAll(e.target.checked)}
                />
                <ul className="todo-list">
                    {this.props.todos.map((todo,index)=>{
                        return <Todo 
                                    todo={todo} key={index} 
                                    deleteTodo={this.props.deleteTodo}
                                    toggleTodo={this.props.toggleTodo}
                                ></Todo>
                    })}
                </ul>
            </section>
        )
    }
}