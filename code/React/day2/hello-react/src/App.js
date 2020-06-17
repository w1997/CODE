import React from 'react';
import Add from './Components/add/add'
import List from './Components/list/list'
class App extends React.Component {
  state={
    comments:[
      {id:"001",name:"小张",content:"我觉得还行"},
      {id:"002",name:"小王",content:"太难了叭"},
      {id:"003",name:"小李",content:"学着简单"},
    ]
  }
  //添加一条评论
  addComment=(commentObj)=>{
    let{comments}=this.state
    comments.unshift(commentObj);
    //comments:comments可以写成comments
    this.setState({comments:comments});
  }
  //删除一条评论
  deleteComment=(id)=>{
    let comments=[...this.state.comments]
      comments = comments.filter((item)=>{
      return item.id !== id
    })
    this.setState({comments});
  }
  render(){
    let {comments}=this.state
    return (
      <div className="App">
        <header className="site-header jumbotron">
          <div className="container">
            <div className="row">
              <div className="col-xs-12">
                <h1>请发表对React的评论</h1>
              </div>
            </div>
          </div>
        </header>
        <div className="container">
          <Add addComment={this.addComment}></Add>
          <List comments={comments} deleteComment={this.deleteComment}></List>
        </div>
      </div>
    );
  }
}

export default App;
