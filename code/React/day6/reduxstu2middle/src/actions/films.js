import { toggleLoading } from "./loading"
import axios from "axios"
export function setFilms(films){
    return {
        type:"SET_FILMS",
        films
    }
}
export function  getFilms(){
    return function (dispatch){
        dispatch(toggleLoading(true));
        let url = "https://mockapi.eolinker.com/2ZhGVxjacb39010e6753bd9c02ee803e6e3bfeab6e8007c/data2";
        //let url="http://api.douban.com/v2/movie/in_theaters?apikey=0df993c66c0c636e29ecbb5344252a4a&start=0&count=10";
        // 发送ajax之前，要开启loading 
        dispatch(toggleLoading(true))
        axios.get(url).then((res)=>{
            dispatch(setFilms(res.data.films))
            dispatch(toggleLoading(false))
        }).catch((err)=>{
            console.log(err);
            dispatch(toggleLoading(false))
        })
    }
}