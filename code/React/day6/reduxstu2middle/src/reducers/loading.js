
export default function movie(state=false,action){
    switch(action.type){
        case "TOGGLE_LOADING":
            return action.flag;
        default:
            return state;
    }
}