import React from 'react'
import Item from '../item/item.js'
import "./list.css"
class List extends React.Component{
    render(){
        let { comments,deleteComment}=this.props;
        return(
        <div className="col-md-8">
            <h3 className="reply">评论回复：</h3>
            <h2 style={{display:comments.length === 0 ? "block" : "none"}} >暂无评论，点击左侧添加评论！！！</h2>
            <ul className="list-group">
                {
                    comments.map((item)=>{
                        return <Item key={item.id} {...item} deleteComment={deleteComment}></Item>
                    })
                }
            </ul>
        </div>
        )
    }
}
export default List