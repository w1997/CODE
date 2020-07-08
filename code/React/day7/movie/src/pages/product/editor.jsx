import React, { Component } from 'react';
import E from 'wangeditor'

class Editor extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         editorContent:''
    //      };
    // }
    // 设置一个状态
    state = { editorContent:''};
    componentDidMount() {
        // 接收父组件传递的数据
        const{detail}=this.props;
        const elemMenu = this.refs.editorElemMenu;
        const elemBody = this.refs.editorElemBody;
        const editor = new E(elemMenu,elemBody)
        // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
             editor.customConfig.onchange = html => {
                //  这个函数是改变富文本输入框改变时，会调用
                // 打印出输入的内容
                // console.log(editor.txt.html())
                this.setState({
                    // editorContent: editor.txt.text()
                    editorContent:editor.txt.html()
                })
            }
            // const html=detail
            // editor.txt.append(detail)
            // editor.txt.html(detail)
        editor.customConfig.menus = [
            'head',  // 标题
            'bold',  // 粗体
            'fontSize',  // 字号
            'fontName',  // 字体
            'italic',  // 斜体
            'underline',  // 下划线
            'strikeThrough',  // 删除线
            'foreColor',  // 文字颜色
            'backColor',  // 背景颜色
            'link',  // 插入链接
            'list',  // 列表
            'justify',  // 对齐方式
            'quote',  // 引用
            'emoticon',  // 表情
            'image',  // 插入图片
            'table',  // 表格
            'video',  // 插入视频
            'code',  // 插入代码
            'undo',  // 撤销
            'redo'  // 重复
        ]
        editor.customConfig.uploadImgShowBase64 = true
        editor.create()
        // 设置初始化数据，好像必须要放在editor.create()后面
        // 在其它地方设置都会报错
        editor.txt.html(detail)
    };

    render() {
        // const {editorContent}=this.state
        // console.log(editorContent)
        return (
            <div className="shop">
                <div className="text-area" >
                    <div ref="editorElemMenu"
                         style={{backgroundColor:'#f1f1f1',border:"1px solid #ccc"}}
                         className="editorElem-menu">

                    </div>
                    <div
                        style={{
                            padding:"0 10px",
                            overflowY:"scroll",
                            height:300,
                            border:"1px solid #ccc",
                            borderTop:"none"
                        }}
                        ref="editorElemBody" className="editorElem-body">

                    </div>
                </div>
            </div>
        );
    }
}

export default Editor;

