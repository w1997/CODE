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