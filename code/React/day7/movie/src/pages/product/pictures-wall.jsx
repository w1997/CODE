import React from 'react'
import { Upload, Icon, Modal, message } from 'antd';
import {reqDeleteImg}from '../../api/index'
function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

export default class PicturesWall extends React.Component {
    state = {
        //   控制弹框的显示和隐藏（弹出的是放大的图片）
        previewVisible: false,
        // 大图的url
        previewImage: '',
        // 上传文件的列表
        fileList: [],
    };
    // 取消图片弹框
    handleCancel = () => this.setState({ previewVisible: false });
    // 点击预览
    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
        });
    };
    // 上传中，完成、失败都会调用这个函数
    handleChange = async({ file,fileList }) => {
        // file代表当前操ou作的图片（上传、删除）
        // fileList所有已上传图片文件对象的数组
        // 得到图片上传的状态，文件的总数
        console.log(file.status,fileList.length)
        if(file.status==="done"){
            // 
           const result= file.response;
        //    console.log(result)
           if(result.status===0){
               message.success("上传图片成功")
               let{name,url}=result.data
            //   只要上传 fileList.length就会有数据
               file=fileList[fileList.length-1]
               file.name=name;
               file.url=url;
           }else{
               message.error("上传失败")
           }
        }else if(file.status==="removed"){
            // 点击垃圾桶，进行删除，删除的是fileList中的数据
            // 我们需要把后端的数据进行删除
          let result= await reqDeleteImg(file.name);
        if(result.data.status===0){
            message.success("删除图片成功了")
        }else{
            message.error("删除图片失败")
        }
        }
        // 在上传中或完成时更新状态
        this.setState({ fileList });
    }
    // 获取所有已经上传的图片
    getImgs=()=>{
        return this.state.fileList.map(file=>file.name)
    }
    render() {
        const { previewVisible, previewImage, fileList } = this.state;
        // uploadButton就是那个+号和upload
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <div className="clearfix">
                <Upload
                    // 上传图片的地址,请求接口
                    // Upload 中自己封装了ajax，所以在调接口的时候，我们不需要再去封装上传图片的接口
                    action="/manage/img/upload"
                    //   accept是接受上传文件的类型
                    accept="image/*"
                    //   上传列表的内建样式
                    listType="picture-card"
                    // 请求的参数名
                    name="image"
                    //   所有已上传图片文件对象的数组
                    fileList={fileList}
                    //   点击图片预览，就是图片上的小眼睛
                    onPreview={this.handlePreview}
                    //   上传的文件改变时状态
                    onChange={this.handleChange}
                >
                    {/* fileList.length表示上传图片的最大个数 */}
                    {fileList.length >= 3 ? null : uploadButton}
                </Upload>
                {/* 大图弹框 */}
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        );
    }
}