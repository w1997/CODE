export function increment(){
    return{
        type:"INCREMENT"
    }
}
export function decrement(){
    return{
        type:"DECREMENT"
    }
}
//异步的actions返回的是一个函数
export function incrementAsync(){
    return function (dispatch,getState){
        //异步操作
        setTimeout(()=>{
            dispatch(increment())
        },2000)
    }
}
export function incrementIfOdd(){
    return function(dispatch,getState){
        let {counter}=getState();
        if(counter%2){
            //是奇数
            dispatch(increment())
        }
    }
}