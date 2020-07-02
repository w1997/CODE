### fetch
1）新版的浏览器是自带的fetch，不需要引入库
2）fetch是已经封装好的，是基于promise
3）fetch的基本使用
  + fetch("/public/user.txt").then(res=>{
 
  },err=>{

  })
  + fetch 想要拿到数据，需要对数据进行解析，可以通过.json进行解析，解析的就是json文件；通过.blod就是不解析，是一个天然的二进制；.formData;.text解析成文本；.arrayBuffer解析成一个二进制数组；
  注：进行解析后的数据也是一个promise，我们需要.then,拿到成功的数据，.catch拿到错误的数据；
  可以写成async 和await，我们需要写一个立即执行函数
  (async()=>{

  })()
  + fetch 会有跨域问题
  + from
