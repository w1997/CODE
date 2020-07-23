## day1

### ES6的新特性

+ let（声明变量），const（声明常量，常量不能修改的量）

  ==let和const命令来进行块级作用域的声明==

+ var、let、const的区别

  1）let和const声明变量不存在变量提升，如果要使用这个变量，我们需要在变量定义之后使用；

  2）let和const不能重复声明变量，如果重复声明会报错；

  3）用let和const在全局声明变量不会个window增加属性；

  4）let和const出现正在代码块中，会把代码块（字面量声明对象除外）变成块级作用域，并且出现暂时性死区

  ==测试==：let和const是否还会变量提升

  1）直接使用一个未定义的变量

  `console.log(a)`

  会报错：a is not defined

  2）我们在let之前调用变量

  `console.log(a)`

  `let a=2`

  会报错：cannot access 'a' before initialization,就是不能在初始化之前访问a

  ==结论==：let/const声明的变量，仍然会提前被收集到变量对象中，但和var不同的是，let/const定义的变量，不会在这个时候给它==赋值undefined==，因为完全没有赋值，即使变量提升了，我们也不能在赋值之前调用它，这就是我们常说的暂时性死区。

+ class（创建类）

  import/export（基于ES6的模块规范创建导入/导出模块（文件/组件））

  new set （数组去重）

  Symbol（唯一的值） `var a=Symbol('bbb')`

  …ary（展开运算符、剩余运算符）

  ${ }模板字符串

  解构赋值  `let {a}=obj`

  for of 循环

+ 箭头函数

  + 箭头函数与普通函数的区别

    1）箭头函数是匿名函数，不能作为构造函数，不能使用new

    2）箭头函数没有原型属性

    3）this指向不同，箭头函数的this是定义时所在的随想，普通函数看前面有没有`.`，`.`前面是谁this就是谁，没有`.`就是window

    4）不可以使用arguments对象，该对象在函数体内不存在

+ 数组新增方法：flat、find、findIndex
+ 对象新增方法：object.assign()，object.keys()，object.create()

### this指向问题

### JS的数据类型

+ 基本数据类型：number数字；boolean 布尔值；string字符串；null空对象；undefined未定义的值；Symbol()产生一个唯一的值，和谁都不重复。

  + null和undefined的区别：

    + null是一个表示“无”的***对象***，转为数值时为0

    + undefined是一个表示“无”的原始值，转为数值时为NaN

    + 当*声明的变量还未被初始化时*，变量的默认值为undefined；null用来表示尚未存在的对象，常用来表示函数企图返回一个不存在的对象。

    + undefined是表示“缺少值”，就是此处应该有一个值，但是还没有定义。

      1）变量被声明了，但没有赋值时，就等于undefined

      2）调用函数时，应该提供的参数没有提供，该参数等于undefined

      3）对象没有赋值的属性，该属性的值为undefined

      4）函数没有返回值时，默认返回undefined

    + null表示“没有对象”，即该处不应该有值。

      1）作为函数的参数，表示该函数的参数不是对象

      2）作为对象原型链的终点

      ==注==：undefined的类型（typeof）是undefined；null的类型（typeof）是object；在验证null时，一定要使用 ===，因为 == 无法分类null和undefined。

+ 引用数据类型：

  + JS的引用数据类型，比如数组，它们值的大小是不固定的。引用数据类型的值是保存在堆内存中的对象。JS不允许直接访问==堆内存==中的数据，因此我们不能直接操作对象的对内存空间。在操作对象时，实际上是在操作对象的引用而不是实际的对象。因此，引用类型的值都是按引用访问的这里的引用，我们可以理解为保存在变量对象中的一个地址该内存与堆内存的实际值相关联。

  ```js
  var a=20;
  var b=a;
  b=30;
  console.log(a)
  //求a的值;a=20
  ```

  解析：变量对象中的数据发生复制行为时，系统会自动为新的变量分配一个值，虽然a和b的值都是20，但它们已经相互独立，不影响了。

  ```js
  var m={a:10,b:20}
  var n=m;
  n.a=15;
  console.log(m.a)
  //m.a的值是15
  ```

  解析：引用数据类型的复制同样也会为新的变量自动分配一个新的值保存在变量对象中，但是不同的是，这个新的值，仅仅只是引用数据类型的一个地址指针。当地址指针相同是，尽管它们是相互独立，但是在变量对象中访问的具体对象实际上是同一个。

  ```js
  var obj={
          a:1,
          fn:(function(val){
              // 赋给fn的是自执行函数的执行结果
              // 也就是一个undefined，是a of undefined 即obj是undefined
              // 该自执行函数只会执行一次
              console.log(val)
          })(obj.a)
      }
  ```

+ 基本数据类型与引用数据类型的区别：基本数据类型是==操作值==，引用数据类型操作的是==堆内存空间地址==。

  ```js
  let a=3;
      let b=new Number(3);
      let c=3;
      console.log(a==b);//true
      console.log(a===b);//false
      console.log(b===c);//false
      console.log(typeof(a));//number
      // typeof得到的是元素属于哪种数据类型
      console.log(typeof(b));//object
      // instanceof是判断某一个元素是否属于哪种数据类型，返回值是true或false
      console.log( b instanceof String)
  ```

  解析：== 是相对比较，会进行默认的类型转化；若转换后的值相等，则结果就是true。

  === 是绝对比较，值不但要相同、类型也得相同（引用数据类型之间的比较，就看是不是同一个地址）。

### JS作用域的理解

+ JS中的作用域分为两种：全局作用域和函数作用域。
+ 作用域：在JS中我们可以将作用域定义为一套规则，这套规则用来管理JS引擎如何在当前作用域以及嵌套的子作用域中根据标识符名称进行变量查找。（标识符指的是变量名或者函数名）

+ 作用域链：是由当前环境与上层环境的一系列变量对象组成，它保证了当前执行环境对符合访问权限的变量和函数的有序访问

### 闭包

+ 定义：闭包是一种特殊的对象。它是由两部分组成，执行向下文（代号A）以及在该执行上下文中创建的函数（代号B）。当B执行时，访问了A中变量对象中的值，那么闭包就会产生。

+ 闭包的作用

  + 可以让内部函数访问外部函数作用域

  + 保护变量不受外界污染，使其一直存在在内存中

    ==注==：在工作中我们还是少使用闭包好，因为闭包太消耗内存

+ 闭包的形成需要两个条件：

  + 在函数内部创建新的函数
  + 新的函数在执行时，访问了函数的变量对象（只有满足这个条件才可以判断哪个才是闭包）。



### 数组

### 原型及原型链

###  JS的异步编程

```js
<script>
    async function async1() {
        console.log("async1 start")
        await async2();
        console.log('async1 end')
    }
    async function async2() {
        console.log('async2');
    }
    // async1();
    console.log("script start");
    // 以第二个参数是0的方式调用setTimeout就是推迟到调用栈为空才执行回调。
    setTimeout(function () {
        console.log("settimeout");
    }, 0)
    // 如果async1()放在console.log("script start")之前
    // 运行的结果就是async1 start，async2，script start
    // async表达式定义的函数也是立即执行的
    async1();
    new Promise(function (resolve) {
        console.log("promise1")
        // 当执行到resolve()时，这个任务会被放到回调队列
        // 中，等待调用栈有空闲时事件循环再来取走它
        resolve();
        // 如果为真就执行resolve()
    }).then(function () {
        console.log("promise2");
    });
    console.log('script end')
// JS复习.html:46 script start
// JS复习.html:39 async1 start
// JS复习.html:44 async2
// JS复习.html:53 promise1
// JS复习.html:58 script end
// JS复习.html:41 async1 end
// JS复习.html:56 promise2
// JS复习.html:49 settimeout
// 首先，事件循环从宏任务（macrostack）队列开始，这个时候，宏任务队列中，只有一个 script (整体代码)任务。从宏任务队列中取出一个任务来执行。
// 首先执行 console.log('script start')，输出 ‘script start'
// 遇到 setTimeout 把 console.log('setTimeout') 放到 macrotask 队列中
// 执行 aync1() 输出 ‘async1 start' 和 'async2' ,把 console.log('async1 end') 放到 micro 队列中
// 执行到 promise ，输出 'promise1' ，把 console.log('promise2') 放到  micro 队列中
// 执行 console.log('script end')，输出 ‘script end'
// macrotask 执行完成会执行 microtask ，把 microtask quene 里面的 microtask 全部拿出来一次性执行完，所以会输出 'async1 end' 和 ‘promise2'
// 开始新一轮的事件循环，去除执行一个 macrotask 执行，所以会输出 ‘setTimeout'
// 原文链接：https://blog.csdn.net/MFWSCQ/article/details/105109727
</script>
```

  MDN是这样描述await的：
    async函数中可能会有await表达式，这样会使async函数暂停执行，等表达式中的Promise解析完成后继续执行async函数并返回解决结果。
    阮一峰老师的解释是：
 async函数返回一个Promise对象，当函数执行的时候，一旦遇到await 就会先返回，等到触发的异步操作完成，在接着执行函数体内后面的语句。

 async表达式定义的函数也是立即执行的

当await操作符后面的表达式是一个promise的时候，它的返回值，实际上就是Promise的回调函数resolve的参数。

Promise是一个立即执行函数，但是它打印的成功（或失败：reject）的回调函数resolve却是一个异步执行的回调。

## day2 JS基础

### [ “1”, “2”,”3” ].map(parenInt)答案是多少？

答案：[1,NaN,NaN]

解析：

1）了解map()方法，map()方法是返回一个新数组，数组中的元素为原始数组元素调用函数处理后的值。

2）map()方法按照原始数组袁术顺序依次处理元素。注：map()不会改变原始数组。

![捕获](F:\CODE\JS相关笔.assets\捕获.PNG)

 因为parseInt需要两个参数（string，radix) ，但map传了3个（element，index，array），即原例子相当于[parseInt(“1”,0),parseInt(“2”,1),parseInt(“3”,2)]

分析：第一个数组元素，(由于radix的值是0，可以忽略)又string是1，所以parseInt()将把它解析为十进制的整数1；第二个元素中，1不在2~36之间，输出NaN；第三个元素中，radix是2，表示string是一个二进制数，但3不是一个合法的二进制数，所以输出NaN。因此最后结果就是[1,NaN,NaN].

### JSON

+ 定义：JSON（JavaScript Object Notation）是一种轻量级的数据交换格式。

+ 优点：它是基于JavaScript的一个子集。数据格式简单，易于读写，占用宽带小。

+ JSON字符串转换为JSON对象

  ```
  let str="{"age":"10","name":"小张"}";
  var obj1=eval('('+str+')');
  var obj2=JSON.parse(str);
  console.log(obj1,obj2)
  //运行结果{age:10,name:"小张"}
  ```

+ JSON对象转换为JSON字符串

  ```
  obj={age:10,name="小张"}
  var last=JSON.stringify(obj)
  //运行结果{"age":"10","name":"小张"}
  ```

### 强制类型转换和隐式类型转换

+ 强制（parseInt(),parseFloat(),Number())
+ 隐式（==  !!）

### 面向对象，构造函数

地址：https://www.jianshu.com/p/15ac7393bc1f

+ 对象定义：对象是无序属性的集合，其属性可以包含基本值，对象或者函数

+ 创建对象

  + 通过new的方式创建一个对象

    `var obj=new Object()`

  + 通过对象字面量的形式创建一个对象

    `var obj={}`

+ 给对象添加方法和属性

  ```js
  var person={};
  person.name="xiaoming";
  person.getName=function(){
      return this.name;
  }
  //也可以这样
  var person={
      name:"xiaoming",
      getName:function(){
          return this.name;
      }
  }
  ```

+ 访问对象的属性和方法

  写一个简单的对象：

  ```js
  var person={
  	name:"xiaoming",
      age:"18",
      getName:function(){
          return this.name
      }
  }
  ```

  当我们想访问name属性时，可以用如下两种方式访问

  ```js
  person.name
  //或者
  person['name']
  ```

  如果想要访问的属性名是一个变量时，常常会使用第二种方式。例如我们要同时访问person的name与age，可以这样写：

  ```js
  ['name','age'].forEach(function(item){
  	console.log(person[item])
  })
  ```

  