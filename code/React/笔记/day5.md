### 通过脚手架使用Redux
1)创建一个项目 create-react-app myreudex
2)安装redux npm i redux -S
+ store.jsx
import {createStore} from "redux"
import reducer from "./reducer"
export default createStore(reducer);
