import ajax from './ajax'
import jsonp from 'jsonp'
import { message } from 'antd';
let URL="";
export const resLogin=(username,password)=>ajax(URL+"/login",{username,password},"POST")
//封装天气
export const reqWeather=(city)=>{
  return new Promise((resolve,reject)=>{
    let url=`http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
    jsonp(url,{},(err,data)=>{
        if(data.status==="success"){
            let{dayPictureUrl,weather}=data.results[0].weather_data[0]
            resolve(dayPictureUrl,weather)
        }else{
            message.error("获取天气失败了")
        }
    })
  })
}
reqWeather("郑州")



