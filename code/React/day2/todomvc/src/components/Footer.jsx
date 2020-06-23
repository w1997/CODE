import React,{Component} from "react"
export default class Fooer extends Component{
    render(){
        return(
            <footer className="footer">
                <span className="todo-count"><strong>{this.props.leftTodos} &nbsp;</strong>item left</span>
                <ul className="filters">
                    <li><a href="javascript:;" className={this.props.visibility=='all'?'selected':''} onClick={()=>this.props.setVisibility('all')}>all</a></li>
                    <li><a href="javascript:;" className={this.props.visibility=='active'?'selected':''} onClick={()=>this.props.setVisibility('active')}>active</a></li>
                    <li><a href="javascript:;" className={this.props.visibility=='completed'?'selected':''} onClick={()=>this.props.setVisibility('completed')}>completed</a></li>
                </ul>
                {this.props.finishTodos>0 ? 
                <button className="clear-completed" onClick={()=>this.props.clearCompleted()}>clear completed</button> : null}
            </footer>
        )
    }
}