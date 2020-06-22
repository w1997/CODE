//引入compose
import {createStore,compose}from "redux"
import reducer from "./reducer"
//配置redux-devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default createStore(reducer, composeEnhancers());


