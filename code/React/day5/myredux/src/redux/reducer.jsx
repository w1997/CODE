import {INCREMENT,DECREMENT} from "./action_types"
let initState=0;//设置初始化状态

export default function reducer(preState=initState,action){
    const{type,data}=action;
    switch(type){
        case INCREMENT:
            return preState+data;
        case DECREMENT:
            return preState-data;
        default:
            return preState;
    }
}





