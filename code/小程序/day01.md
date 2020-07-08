### 数据绑定
WXML 中的动态数据均来自对应 Page 的 data
+ （1）简单绑定
    数据绑定使用Mustache语法(双大括号)将变量包起来.
    在.wxml文件中写下面的代码
    `<view>{{mesg}}</view>`
    在.js文件中写下面的代码
        ```
        Page({
              data: { mesg:'欢迎学习微信小程序'}
            })
        ```
        就可以实现简单的数据绑定
+ （2）组件属性中使用（需要在双引号之内）
    `<view id="item-{{id}}"></view>`
    ```
    Page({
      data: {
        mesg: '欢迎学习微信小程序',
        id:0 }
    })
    ```
+ （3）控制属性（需要在双引号之内）
    `<view wx:if="{{condition}}"></view>`
    ```
    Page({
      data: { condition: true }
    })
    ```
+ (4)关键字（需要在双大括号内）  
    表示是否要在选择框中打对勾，用false，true的时候如果不加大括号，就变成的一个字符串，结果是个真值。
    `<checkbox checked="{{false}}"></checkbox>`
+ 在{{}}可以进行运算
    （1）三元运算
    `<view hidden="{{flag? true:false}}">Hidden</view>`
    如果flag是true，组件view的内容就会被隐藏
    （2）算数运算
    `<view>{{a+b}}+{{c}}+d</view>`
    ```
    Page({
      data: {
        a: 1,
        b: 2,
        c: 3
      }
    })
    ```
    view中的内容为 3 + 3 + d
    （3）逻辑判断
    `<view wx:if="{{length>5}}"></view>`
    (4)字符串运算
    `<view>{{"hello"+name}}</view>`
    ```
    Page({
          data:{name: 'MINA'}
        })
    ```
### 列表渲染
+ wx:for 
    在组件上使用wx:for控制属性绑定一个数组，即可使用数组中的各项的数据重复渲染这个数组。
    注：默认数组的当前项的下标的变量名默认为index，数组当前项的变量名默认为item。
    (1)在数组中的简单使用
    `<view wx:for="{{array}}">
    {{index}}:{{item.message}}
    </view>`
    ```
    Page({
      data: {
        array: [
      { message:'欢迎学习小程序'},
      {message:"请认真对待"}]
      }
    })
    ```
    wx:for 不仅可以遍历数组，同样也可以遍历对象，遍历数字；
    （2）给index和item设置别名
    使用wx:for 可以指定数组当前元素的变量名item和下标名index(注意，要写在组件上)
    ```
    <view wx:for="{{array}}" wx:for-index="idx" wx:for-item="itemName">
    {{idx}}: {{itemName.message}}
    </view>
    ```
    （3）wx:for 的简单嵌套
    ```
    <view wx:for="{{[1,2,3,4,5,6,7,8,9]}}" wx:for-item="i">
	    <view wx:for="{{[1,2,3,4,5,6,7,8,9]}}" wx:for-item="j">
	    	<view wx:if="{{i<=j}}">
	    		{{i}}*{{j}}={{i*j}}
	    	</view>
	    </view>
    </view>
    ```
    (4)block,是没有语义的，可以把view组件包起来，但在控制台看的时候并不会显示,它仅仅是一个包装元素，不会在页面中做任何渲染，只接受控制属性。
+ wx:key
    使用 wx:key 来指定列表中项目的唯一的标识符。
    wx:key 的值以两种形式提供
    1)字符串，代表在for循环array中item的某个property，该 property 的值需要是列表中唯一的字符串或数字，且不能动态改变。
    2)保留关键字，*this代表在for循环中的item本身，这种表示需要item本身是一个唯一的字符串或者数字。
注：（1）当wx:for的值是字符串是，会把字符串解析成字符串数组
    （2）花括号和引号之间如果有空格，将最终解析成为字符串
### 条件渲染
+ wx:if
    使用wx:if来判断是否徐亚渲染该代码块
    `<view wx:if="{{condition}}"> True </view>`
    也可以用 wx:elif 和 wx:else 来添加一个 else 块：
    ```
    <view wx:if="{{length>5}}">1</view>
    <view wx:elif="{{length>2}}">2</view>
    <view wx:else>3</view>
    ```
+ wx:if和hidden的区别
    （1）因为wx:if之中的模板也可能包含数据绑定，所以当wx:if的条件切换时，框架有一个局部渲染的过程，因为它会确保条件块在切换时销毁或重新渲染。
    （2）wx:if也是惰性的，如果在初始渲染的条件是false，框架什么也不做，在条件第一次变成真的时候才开始进行局部渲染。
    （3）相比之下，hidden就简单多了，组件始终都会被渲染，只是简单的控制显示和隐藏。
    （4）一般来说，wx:if有更高的切换消耗，而hidden有更高的初始渲染消耗，因此，如果需要频繁切换的情景下，用hidden更好，如果在运行时条件不大可能改变则wx:if较好。
### 模板
WXML提供模板（template）可以在模板中定义代码片段，然后在不同的地方进行调用。
+ 定义模板
    使用name属性，作为模板的名字，然后在`<template/>`内定义代码片段。
    ```
    <template name="msgItem">
	    <view>
        	<text>{{index}}:{{msg}}</text>
            <text>time:{{time}}</text>
        </view>
    </template>
    ```
+ 使用模板
    使用is属性，声明需要的使用的模板，然后将模板所需要的data传入，如：
    `<template is="msgItem" data="{{...item}}"/>`
    ```
    Page({
        data: {
          item: {
            index: 0,
            msg: 'this is a template',
            time: '2016-09-15'
          }
        }
    })
    ```
    is属性可以使用Mustache语法，来动态决定具体需要渲染哪个模板：
    ```
    <template name="odd">
        <view> odd </view>
    </template>
    <template name="even">
          <view> even </view>
    </template>
    -----------
    <block wx:for="{{[1, 2, 3, 4, 5]}}">
        <template is="{{item % 2 == 0 ? 'even' : 'odd'}}"/>
    </block>
    ```
### 引用
WXML提供两种文件引用方式import和include。
+ import
    import可以在该文件中使用目标文件定义的template，如：在 item.wxml 中定义了一个叫item的template：
    ```
    <template name="item">
        <text>{{text}}</text>
    </template>
    ```
    在 index.wxml 中引用了 item.wxml，就可以使用item模板：
    ```
    <import src="item.wxml"/>
    <template is="item" data="{{text: 'forbar'}}"/>
    ```
    import 的作用域
        import 有作用域的概念，即只会 import 目标文件中定义的 template，而不会 import 目标文件 import 的 template。
        如：C import B，B import A，在C中可以使用B定义的template，在B中可以使用A定义的template，但是C不能使用A定义的template。
+ include
    include可以将目标文件除了`<template/> <wxs/> `外的整个代码引入，相当于拷贝到include位置，如：
    ```
    <!-- index.wxml -->
    <include src="header.wxml"/>
    <view> body </view>
    <include src="footer.wxml"/>
    ```
    ```
    <!-- header.wxml -->
    <view> header </view>
    ```
    ```
    <!-- footer.wxml -->
    <view> footer </view>
    ```
### day02
### 事件
+ 什么是事件
    + 事件是视图层到逻辑层的通讯方式；
    + 事件可以将用户的行为反馈到逻辑成进行处理；
    + 事件可以绑定在组件上，当达到触发事件，会执行逻辑层中的对应的事件处理函数；
    + 事件对象可以携带额外信息，如id，dataset,touches；
+ 事件的使用方式
    （1）在组件中绑定一个事件处理函数。
    如bindtap，当用户点击该组件的时候会在该页面对应的Page中找到相应的事件处理函数。
    `<view id="tapTest" data-hi="WeChat" bindtap="tapName"> Click me! </view>`
    (2)在相应的Page定义中写上相应的事件处理函数，参数是event
    ```
    Page({
        tapName: function(event) {
        console.log(event)
        }
    })
    ```
    (3)在控制台中会看到如下信息：
    ```
    {
        "type":"tap",
        "timeStamp":895,
        "target": {
          "id": "tapTest",
          "dataset":  {
            "hi":"WeChat"
          }
        },
        "currentTarget":  {
          "id": "tapTest",
          "dataset": {
          "hi":"WeChat"
           }
         },
         "detail": {
           "x":53,
           "y":14
         },
         "touches":[{
           "identifier":0,
           "pageX":53,
           "pageY":14,
           "clientX":53,
           "clientY":14
         }],
        "changedTouches":[{
            "identifier":0,
            "pageX":53,
            "pageY":14,
            "clientX":53,
            "clientY":14
        }]
    }
    ```
+ 事件分类
    + 事件分为冒泡事件和非冒泡事件：
        1：冒泡事件：当一个组件上的事件被触发后，该事假会向父节点传递。
        2：非冒泡事件：当一个组件上的事件被触发后，该事件不会像父节点传递。
        WXML的冒泡事件列表：
        类型 --------------触发条件
        touchstart---------手指触摸动作开始
        touchmove----------手指触摸后移动
        touchcancle--------手指触摸动作被打断，如来电提醒，弹框
        touchend-----------手指触摸动作结束
        tap----------------手指触摸后马上离开
        longpress----------手指触摸后，超过350ms再离开，如果指定了事件回调函数并触发了这个事件，tap事件将不会被触发
    注：除上表之外的其它组件自定义事件如无特殊声明都是非冒泡事件
+ 事件绑定
    + 普通事件绑定
        事件绑定的写法类似于组件的属性：
        `<view bindtap="handleTap"> Click here!</view>`
        如果用户点击这个 view ，则页面的 handleTap 会被调用。
        事件绑定函数可以是一个数据绑定,如：
        `<view bindtap="{{ handlerName }}">Click here!</view>`
    + 绑定并阻止事件冒泡(catch)
    除bind外，也可以用catch来绑定事件，与bind不同，catch会阻止事件向上冒泡。
    在下面的例子中，点击小盒子会先后调用handleTap3和handleTap2，因为tap事件会冒泡到中盒子，catch阻止了中盒子继续向上冒泡，点击中盒子会触发handleTap2，点击大盒子就会触发handleTap1。
    ```
    <view id="outer" bindtap="handleTap1">
        大盒子
        <view id="middle" catchtap="handleTap2">
            中盒子
            <view id="inner" bindtap="handleTap3">
                小盒子
          </view>
        </view>
    </view>
    ```
    + 互斥事件绑定
    一个mt-bind触发后，如果事件冒泡到其它节点上，其它节点上的mu-bind绑定函数不会被触发，但bind绑定函数依旧会被触发。
    换句话说，所有的mu-bind都是“互斥”的，只会有其中一个绑定函数被触发。同时它完全不影响bind和catch的绑定效果。
    例如在下边这个例子中，点击 inner view 会先后调用 handleTap3 和 handleTap2 ，点击 middle view 会调用 handleTap2 和 handleTap1 。
    ```
    <view id="outer" mut-bind:tap="handleTap1">
        outer view
        <view id="middle" bindtap="handleTap2">
            middle view
            <view id="inner" mut-bind:tap="handleTap3">
                inner view
            </view>
        </view>
    </view>
    ```
### 组件
+ Component 构造器
    Component 构造器可用于定义组件，调用Component构造器时可以指定组件的属性、数据、方法等。
    ```
    Component({
         /**
          * 组件的属性列表
          */
        properties: {
            myProperty: { // 属性名
                type: String,
                value: ''
            },
            myProperty2: String // 简化的定义方式
        },
         /**
          * 组件的初始数据
          */
        data: {
        <!-- 这是组件本身的私有数据，可用于模板渲染-->
        },
         /**
          * 组件的方法列表
          */
         methods: {
        }
    })
    ```
    + 组件所在页面的生命周期函数
    ```
     pageLifetimes: {
    <!-- 组件所在页面被展示时执行 -->
    show: function () { },
    <!-- 组件所在页面被隐藏时执行 -->
    hide: function () { },
    <!-- 组件所在页面尺寸变化时执行 -->
    resize: function () { },
    },
    ```
    + 组件的生命周期函数
      组件的生命周期函数，指的是组件自身的一些函数，这些函数在特殊的时间点或遇到一些特殊的框架事件时被自动触发。
        + 组件实例刚刚被创建好，created生命周期被触发。此时，组建数据this.data就是在Component构造器中定义的数据data。此时还不能被调用setData。通常情况下，这个生命周期只应该用于给组件this添加一些自定义属性字段。
        + 在组件完全初始化完毕、进入页面节点树后，attached生命周期被触发。此时，this.data已被初始化为组件的当前值。这个生命周期很有用，绝大数初始化工作可以在这个时机进行。
        + 在组件离开页面节点树后，detached生命周期被触发。退出一个页面时，如果组件还在页面节点树中，则detached会被触发。
     ```
     lifetimes: {
      // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
      <!-- 在组件实例刚刚被创建时执行 -->
      created: function () { },
      <!-- 在组件实例进入页面节点树时执行 -->
      attached: function () { },
      <!-- 在组件实例被移动到节点树另一个位置时执行 -->
      moved: function () { },
      <!-- 在组件实例被从页面节点树移除时执行 -->
      detached: function () { },
    },
    ```
+ 组件间的通信
    page组件是父组件，component组件是子组件
    子组件newlist.js ：
    ```
    Component({
        properties: {
            <!-- title是父组件传过来的属性-->
          title:{
            type:String,
            value:"默认title",
            observer:function(newVal,oldVal){
              console.log(newVal,oldVal)
            }
          }
        },
        data: {},
        methods: {
            <!-- 子组件当点击按钮时，调用的函数 -->
          onBtnClick(){
            // console.log("newlist组件中的方法")
            // 触发自定义事件
            this.triggerEvent('btnClick',{age:100});
          }
        }
    })
    ```
    子组件newlist.wxml：
    ```
    <view>
        <view>{{title}}</view>
        <!-- 在子组件中定义一个button组件，然后写一个点击事件 -->
        <button size="mini" type="primary" bindtap="onBtnClick">改变计数</button>
    </view>
    ```
    父组件mine.json:
    引入子组件
    ```
    {
        "usingComponents": {
        "new-list":"/components/newlist/newlist"
        }
    }
    ```
    父组件mine.js
    ```
    Page({
        data: {
          counter:0
        },
        // 自定义事件发生时，执行此函数
        onButtonClick(value){
          console.log(value)
          console.log("方法执行了")
          this.setData({
            counter:++this.data.counter
          })
        }
    })
    ```
    父组件mine.wxml
    <!-- bind:btnClick="onButtonClick" 表示自定义事件 -->
    <!-- bind:btnClick 事件名  onButtonClick表示事件处理函数（监听器） -->
    ```
    <view>计数器：{{counter}}</view>
    <new-list title="这是第1条新闻"  bind:btnClick="onButtonClick"/>
    ```
### 插槽
  + 单个插槽
    1)创建一个one-slot组件，在组件.wxml中写如下内容：
    ```
    <view>插槽头部</view>
      <slot></slot>
    <view>插槽尾部</view>
    ```
    2)在页面组件中创建one-s，在该组件的.json文件中引入插槽组件，写如下代码：
    ```
    {
      "usingComponents": {
      "one-slot":"/component/one-slot/one-slot"
      }
    }
    ```
    3)在页面组件one-s中的.wxml文件中使用单个插槽
    ```
    <one-slot>我是插槽</one-slot>
    <one-slot><text>我是text组件</text></one-slot>
    <one-slot><button type="primary">我是插入的button组件</button></one-slot>
    ```
  注：插槽中可以写普通文本，也可以写组件
  + 多个插槽
  1）创建一个组件many-slot,我们在创建多个插槽的时候，与我们需要给插槽写个name属性，在组件.wxml中写如下内容：
    ```
    <view class="nav">
	    <view class="nav-left">
		    <slot name="left"></slot>
	    </view>
	      <view class="nav-center">
		      <slot name="center"></slot>
	      </view>
	      <view class="nav-right">
		      <slot name="right"></slot>
	      </view>
    </view>
    ```
    2)在页面组件中创建many-s，在该组件的.json文件中引入插槽组件，写如下代码：
      ```
      {
        "usingComponents": {
          "many-slot":"/component/many-slots/many-slots"
        }
      }
      ```
    3)在页面组件many-s中的.wxml文件中使用多个插槽
      ```
      <many-slot>
	      <text slot="left">菜单</text>
	      <text slot="center">菜名</text>
	      <text slot="right">价格</text>
      </many-slot>
      ```
      4)注：在使用多个插槽时，需要在插槽组件中的.js文件进行配置，不然会没有显示,在Component中添加options组件
        ```
        Component({
          options: {
           multipleSlots:true,
        },
        })
        ```
### day03
### 页面链接
  + navigator
  + 去页面中拿数据
  1）在页面跳转的时候可以传递数据，在detail页面组件通过生命周期函数onLoad中可以拿到我们传递的数据，通过打印options我们可以看到我们传递的数据
  2）在url中通过？传参
  + 页面间的跳转，和返回，在button组件中，写一个点击事件，完成返回到上一级，需要在.js文件中一个点击时触发的函数，onBackBtn方法中使用的就是wx.navigateBack({})


