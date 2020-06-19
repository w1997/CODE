import React,{Component} from "react";
export default class Detail extends Component{
    componentDidMount(){
        // let id = this.props.match.params.id;
        // let url = `http://xxx.xx.com/api/${id}`
        // axios.get(url).then().catch()
    }
    render(){
        return(
            <div>
                <h3>这是新闻详情页面</h3>
                <p>这是第{this.props.match.params.id}条新闻正文</p>
                <button onClick={()=>this.props.history.go(-1)}>返回</button>
            </div>
        )
    }
}