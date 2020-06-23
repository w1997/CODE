import React,{Component} from "react"
import {connect} from "react-redux"
import {toggleLoading} from "../actions/loading"
import {setFilms,getFilms} from "../actions/films"

class Movie extends Component{
    componentDidMount(){
        this.props.getFilms()
    }
    render(){
        return(
            <div>
                <h3>电影列表</h3>
                <p>{this.props.loading ? null : "正在加载中。。。"}</p>
                <ul>
                    {this.props.films.map((item,index)=>
                    <li key={index}>
                        <h3>{item.name}</h3>
                        <img src={item.img}></img>
                        {/* {item.name,item.img} */}
                        {/* {item.img,item.name} */}
                    </li>
                    )}
                </ul>
            </div>
        )
    }
}
export default connect(state=>({loading:state.loading,films:state.films}),{toggleLoading,setFilms,getFilms})(Movie)