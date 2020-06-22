import React,{Component} from "react"
import PropTypes from "prop-types"
import Todo from "./Todo"

export default class TodoList extends Component{
    //验证规则
    static propTypes={
        todos:PropTypes.array.isRequired,
    }
    render(){
        return(
            <section className="main">
                <input type="checkbox"className="toggle-all" />
                <ul className="todo-list">
                    {this.props.todos.map((todo,index)=>{
                        return <Todo todo={todo}key={index}></Todo>
                    })}
                </ul>
            </section>
        )
    }
}