准备工具：
    vscode软件：安装步骤在群中，安装完后，自行设置一下。
    谷歌浏览器：在QQ群，下载直接安装，和安装QQ一样，so easy。

前端开发（大前端时代）。

前端发展历史（了解就OK）：
    web1.0时代： 主要就是静态网页。 你只需要会写网页就OK了。
        1994年，W3C（万维网）成立，网景公司推出了第一版的Navigator浏览器。HTML2.0推出来了。
        CSS（是用来美化HTML）也被设计出来了。94年是前端的起始点。
        1995年，网景公司的Brendan Eich程序员，使用10天的时候，发明了JavaScript。导致这个语言非常的灵活。
        1996年，微软推出了JScript的语言。 同年很多公司都推出来开发网页的语言。  ....
        1997年，ECMA说要把浏览器开发的语言形成一个标准，制定了ECMAScript。我们现在的学习JavaScript主是遵循ECMAScriptp这个标准的。
        1999年，ES3发布了
        2001年，ES4发布（死掉了）
        2015年，ES6发布了
        2016年，ES6增强版
        2017年，ES2017
        2018年，ES2918
        .....
        你只需要掌握HTML，CSS就OK了。 没有前端职位，叫网页制作师。

    web2.0时代：动态网页出现了。
        在不同的时间，访问同一个网站，你看到的内容是不一样。这样的网站，叫动态网站。
        PHP， JSP， ASP  （后端程序员）
        .....  
        这个时代开发的网站都是服务端渲染。

        你只需要掌握HTML, CSS, JS。你只需要把写好的页面交给后端程序员就OK了。也是没有web前端说法。

    web3.0时代：Ajax 可以请求数据。
        前端不只可以写页面，还可以去向后端请求数据。

        前后端分离开发。  web前端这个名词才被提出来了。  2013年左右。‘

    现在：大前端时代
        web前端进军移动端。 利用web前端技术，就可以写Androd， ios。
        Node， 也是使用JS去后端。
        小程序，公众号... 也是使用前端技术来实现的。
        游戏开发，前端技术来开发。
        VR/AR 
        .... 
        现在，能使用JS去实现的，都会使用JS去实现。
        我们需要学习的东西多了，对我的要求也高了。


课程安排：
    第一个阶段：
        HTML5+CSS3为主：web网页开发， 移动端网页开发。
    
    第二个阶段：
        JS为主， ES3， ES5， ES6， ES7， ES8... 
            
    第三个阶段：
        Ajax和HTTP数据请求

    第四阶段：
        框架开发
            vue， react, ng 

    辅助技术：
        webpack 打包 
        git 版本控制 
        node 后端开发
        canvas 绘图


vscode中的一些快捷键盘：
    ctrl+B  打开或折叠 项目目录 视图




------------------------------ 上午的内容
1，安装了vscode  编写代码
    webstrom  收费的  笨重  配置好  破解版的webstrom 
    hbuilder  免费的  也比较好用  地址：https://www.dcloud.io/ 下载huilderX
    sublime  有收费的 也有免费的 之前用的比较多 现在用的也少了
    Atom 
    dreamweaver  基本上没有用了 
    .....

    用的最多的：vscode 免费的  相当好用  插件机制   webstrom也可以

    什么工具无所谓，只要适合自己就OK了。

2，前端的发展？
    网页制作：html  css    静态网页
    动态网页：asp  jsp   php  .....    计算出网页
    异步请求数据：ajax  前后端分离开发  web前端开发工程师/HTML5开发工程师
    大前端的时代：移动端，游戏开发，Canvas，Node，AR/VR，嵌入式...
        高要求   线上   面授 

3，HTML初识？
    超文本标签语言。
    超文本：文本，图片，视频，音频，程序，连接...
    标签：网页就是使用标签堆起来的   <html><body><h1></h1></body></html>
    语言：计算机语言  程序员与计算交流的工具

    HTML中的基本骨架：
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8" />
            <title>淘宝网</title>
            <link href="./css/out.css" />
        </head>
        <body>
            <h1>hello html</h1>
        </body>
    </html>

4，开发者工具：
    每一个浏览器都带了一个开发者工具。
    进入：
        鼠标右键---->检查 
        键盘上的F12  

    主要用来调试CSS与JS，一般不会调试HTML。

--------------------------------------------------
学习HTML就是学习一堆的HTML标签。

参考MDN：https://developer.mozilla.org/zh-CN/

标签：
    列表相关的标签
    表格相关的标签 
    表单相关的标签
    其它标签

表单相关的标签：
    表单也是一个标签，form。不是from。
    概念：元素表示了文档（document）中的一个区域，此区域包含有交互控制元件，用来向 Web 服务器提交信息。

    表单元素（控制元件）：在form表单中，可以包含具有交互功能的表单元素。

表单元素： 
    input标签可以根据type指定input的类型：
        type="text"   <input type="text">   表示一个普通的文本框
        type="password"  <input type="password">  表示一个密码框
        type="radio" <input name="sex" type="radio">  表示一个单选框
        type="checkbox"    <input type="checkbox">  表示一个复选框 
        type="file"   <input type="file">  表示一个文件选择按钮
        type="submit" <input type="submit" value="注册">  表示一个提交按钮
        type="reset" <input type="reset" value="重置">  表示一个重置按钮
        type="image"  <input type="image" src="./imgs/btn.png">  表示一个图片按钮
        type="button"  <input type="button" value="注册">  表示一个普通的按钮
    select+option(下拉菜单):
        <select>
            <option value="">-请选择-</option>
            <option value="">河南省</option>
            <option value="">河北省</option>
            <option value="">江西省</option>
            <option value="">北京市</option>
        </select>
    textarea文本域：
        <textarea cols="30" rows="10" style="resize: none;" ></textarea>



快捷键：shift+alt+向下箭头  复制上一行

标签分女标签和男标签：
    女标签：并排显示  input 
    男标签：独占一行  h1  p（段落）


=======================  讲过的标签
表单相关的标签：
    form：表单  
        input  表单元素 
        select+option  下拉菜单
        textarea  文本域

列表相关的标签：
    无序列表：ul+li 
    有序列表：ol+li 
    自定义列表：dl+dt+dd 

其它常用的标签：
    hn标签  标题标签 
    p  段落标签 
    a  超链接标签 
    img  图片标签
    div  最核心的标签


================================
1，做一个总结。大家准备一个博客的平台。每一天从今天开始讲到写博客的习惯。
    写博客有好处：
        A,找工作时的一个加分项
        B,可以对我们前面学习东西作一个总结
        C,方便后面复习，以及工作的时候，也可以参考。
        D,... 
    平台：
        CSDN，博客园，掘金.....   
    
    周一到周五，周六自习，自习的时候以文章的形式的，把这一周的内容作一个总结。

2，找一个页面，写一个这个页面的结构。
    



