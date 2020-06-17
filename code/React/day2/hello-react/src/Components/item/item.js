import React from 'react'
import "./item.css"
class Item extends React.Component{
  delete=(id)=>{
    let { deleteComment } = this.props
    if(window.confirm("你确定要删除吗？")){
      deleteComment(id)
    }
  }
    render(){
      let {id,name,content}=this.props
        return(
          <li className="list-group-item">
            <div className="handle">
              <a href="javascript:;" onClick={ ()=>{this.delete(id)} }>删除</a>
            </div>
            <p className="user"><span >{name}</span><span>说：</span></p>
            <p className="centence">{content}</p>
          </li>
        )
    }
}
export default Item