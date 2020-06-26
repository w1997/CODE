const USER="USER"
export default{
    saveUser(user){
        localStorage.setItem(USER,JSON.stringify(user))
    },
    getUser(){
        return JSON.parse(localStorage.getItem(USER) || '{}')
    },
    removeUser(){
        localStorage.removeItem(USER)
    }
}