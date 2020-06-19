import React,{Component} from "react" 
import { Route, Link } from "react-router-dom"
export default class List extends Component{
    render(){
        return(
            <div>
                <h3>列表页组件</h3>
                <ul><Link to="/detail/1">这是第一条新闻</Link></ul>
                <ul><Link to="/detail/2">这是第二条新闻</Link></ul>
                <ul><Link to="/detail/3">这是第三条新闻</Link></ul>
                <p>....</p>
                    <button onClick={()=>this.props.history.push("/detail/100")}>第100条新闻</button>
            </div>

        )
    }
}