## 后台管理系统的简单步骤
### 创建一个api文件接口文件
1）创建一个ajax.js文件，对axios进行二次封装。
2）创建一个index.js文件，把请求接口全部封装成函数，目的：请求一个接口就像调用 一个函数一样。
### 在src下创建login文件夹
+ 在login文件下创建login.jsx
方法（1）写ajax请求，拿数据
```
let {username,password}=values;
        resLogin(username,password).then(response=>{
            console.log("成功了",response.data)
        }).catch(error=>{
            console.log("失败了",error)
        })
```
方法（2）用async和await
```
onFinish = async values => {
        let {username,password}=values;
        resLogin(username,password).then(response=>{
            console.log("成功了",response.data)
        }).catch(error=>{
            console.log("失败了",error)
        })
        const response=await resLogin(username,password);
        console.log("成功了",response)
    };
```
