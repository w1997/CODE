import {combineReducers } from "redux"
import counter from "./counter"
import films from './films'
import loading from './loading'

const reducer=combineReducers({
    counter,
    films,
    loading
})
export default reducer