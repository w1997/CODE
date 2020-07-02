export default function formatDate(time){
    if(!time) return ""
    let date=new Date(time);
    return date.getFullYear()+"/"+(date.getMonth()+1+'').padStart(2, '0')+"/"+(date.getDate()+'').padStart(2, '0')+"-"+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()
}