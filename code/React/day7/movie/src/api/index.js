import ajax from './ajax'
import jsonp from 'jsonp'
import { message } from 'antd';

//登录
let URL="";
export const resLogin=(username,password)=>ajax(URL+"/login",{username,password},"POST")
//封装天气
export  const reqWeather=(city)=>{
  return new Promise((resolve,reject)=>{
    let url=`http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
    jsonp(url,{},(err,data)=>{
        if(data.status==="success"){
            let{dayPictureUrl,weather}=data.results[0].weather_data[0]
          //  console.log(dayPictureUrl,weather)
           //天气图片出不来，需要打印对象
            resolve({dayPictureUrl,weather})
            
        }else{
            message.error("获取天气失败了")
        }
    })
  })
}
// ======商品的分类管理接口封装==========
//获取一级或某个二级分类列表
export const reqCategorys=(parentId)=>ajax(URL+"/manage/category/list",{parentId})
//添加分类
export const reqAddCategory=(parentId,categoryName)=>ajax(URL+"/manage/category/add",{parentId,categoryName},'POST')
//更新分类
export const reqUpdateCategory=({categoryId,categoryName})=>ajax(URL+'/manage/category/update',{categoryId,categoryName},'POST')

// =============商品的商品管理接口的封装
// 查看商品信息
export const reqProducts=(pageNum,pageSize)=>ajax (URL+'/manage/product/list',{pageNum,pageSize})
// 搜索商品
export const reqSearchProducts=(pageNum,pageSize,searchName,searchType)=>ajax(URL+'/manage/product/search',{pageNum,pageSize,[searchType]:searchName})
// 对商品进行上架或下架处理
export const reqUpdateStatus=(productId,status)=>ajax(URL+'/manage/product/updateStatus',{productId,status},'POST')
// 删除图片
export const reqDeleteImg=(name)=>ajax(URL+"/manage/img/delete",{name},'POST')
// 添加和修改商品
// 如果传的参数是一个对象，那么后面的值就不用再写上大括号
export const reqAddUpdateProduct=(product)=>ajax(URL+"/manage/product/"+(product._id ?'update':'add'),product,'POST')
// =============用户
// 添加用户
export  const reqAdduser=(username,password,phone,email,role_id)=>ajax(URL+"/manage/user/add",{username,password,phone,email,role_id},'POST')
// 获取所有用户列表
export const reqAllusers=()=>ajax(URL+"/manage/user/list");
// 更新用户
export const reqUpdateuser=(_id,username,phone,email,role_id)=>ajax(URL+"/manage/user/update",{_id,username,phone,email,role_id},'POST')
// 删除用户
export const reqDeleteuser=(userId)=>ajax(URL+"/manage/user/delete",{userId},'POST')