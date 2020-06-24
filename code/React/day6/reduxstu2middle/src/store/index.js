import {createStore,applyMiddleware,compose} from "redux"
import reducer from "../reducers/index"
import thunkMiddleware from "redux-thunk"
//准备初始化状态
const state={
    counter:99,
    loading:false,
    films:[],
}
//需要对createStore进行增强
const createStoreWithMiddleware=applyMiddleware(thunkMiddleware)(createStore)
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//使用增强后的createStore去创建仓库
const store=createStoreWithMiddleware(
    reducer,
    state,
    composeEnhancers()
)
export default store;
