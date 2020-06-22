import {createStore} from "redux"
import reducer from "../reducers/index"
//准备初始化状态
const state={
    counter:99
}
let store=createStore(reducer,state)
export default store;