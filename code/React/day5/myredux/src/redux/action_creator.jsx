import {INCREMENT,DECREMENT} from "./action_types"
//创建action_creator,可以转换成箭头函数
/* function createIncrementAction(value){
    return{
        type:INCREMENT,
        data:value
    }
} */
export const createIncrementAction=value=>({type:INCREMENT,data:value})
export const createDecrementAction=value=>({type:DECREMENT,data:value})




