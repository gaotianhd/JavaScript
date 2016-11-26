### 1.介绍JavaScript的基本数据类型。
    Number数字类型，
    String字符串类型，
    Boolean布尔类型，
    Function函数类型，
    Object对象，
    Null，Undefined

### 2.JavaScript原型，原型链 ? 有什么特点？
    原型：我们创建的每个函数都有一个protoyupe(原型)属性，这个属性是一个指针，指向一个对象，而这个对象的用途是包含可以有特定类型的所有实例共享的属性和方法。
    原型链：用来继承和共享属性的对象组成的对象链。
    特点：
    （1）ECMAScript只支持实现继承，而且其实现继承主要是依靠原型链来实现的。
    （2）只要是原型链中出现过的原型，都可以说是该原型链所派生的实例的原型。
    （3）不能用字面量创建原型的方法，这样做会重写原型链。
    （4）不要在原型对象中定义属性的，否则会被所有实例共享。

### 3.Javascript如何实现继承？
    构造继承，原型继承，构造函数继承可以将构造函数的属性拷贝给实例（＊.call(this,[])）。但是缺点是无法实现函数复用。原型继承可以实现函数复用，但是所有实例共享一个属性，任意一个实例改变原型属性都会改变其它实例的属性值。推荐采用构造函数继承传递属性（拷贝），原型继承传递方法。

### 4.Javascript创建对象的几种方式？
    1.使用内置的类型实例化对象。var a = new Array();
    2.使用字面量的方式创建对象。var b = {};
    3.使用构造函数创建对象。
    4.用function来模拟无参的构造函数，再定义属性。
    5.利用原型方式来创建。
    6.混合方式来创建。

### 5.Javascript作用链域?
    当代码在一个环境中执行时，会创建变量对象的一个作用域链。如果是个函数，则将其活动对象作为变量对象。活动对象在最开始只包含一个arguments对象。而下一个变量对象则来自下一个包含环境。如此一直延续到全局执行环境，这种组织形式即为作用域链。内部函数可访问外部变量，外部变量无法访问内部函数。
    注意：
        js没有块级作用域，若要形成块级作用域，可通过（function（）｛｝）（）；立即执行的形式实现

### 6.谈谈this对象的理解。
    （1）this总是指向函数的直接调用者（而非间接调用者）
    （2）如果有new关键字，this指向new出来的那个对象
    （3）在事件中，this指向触发这个事件的对象，特殊的是IE的attachEvent中的this总是指向全局对象window。

### 7.什么是window对象? 什么是document对象?
    window对象代表浏览器中打开的一个窗口。
    document对象代表整个html文档。
    实际上，document对象是window对象的对象属性。

### 8.null，undefined的区别？
    null表示一个对象被定义了，但存放了空指针。
    undefined表示这个值不存在，typeof(null)--object;typeof(undefined)--undefined

### 9.写一个通用的事件侦听器函数(机试题)。
     // event(事件)工具集，来源：github.com/markyun
     markyun.Event = {
     // 页面加载完成后
     readyEvent : function(fn) {
     if (fn==null) {
     fn=document;
     }
     var oldonload = window.onload;
     if (typeof window.onload != 'function') {
         window.onload = fn;
     } else {
     window.onload = function() {
     oldonload();
     fn();
     };
     }
     },
     // 视能力分别使用dom0||dom2||IE方式 来绑定事件
     // 参数： 操作的元素,事件名称 ,事件处理程序
     addEvent : function(element, type, handler) {
     if (element.addEventListener) {
     //事件类型、需要执行的函数、是否捕捉
     element.addEventListener(type, handler, false);
     } else if (element.attachEvent) {
     element.attachEvent('on' + type, function() {
     handler.call(element);
     });
     } else {
     element['on' + type] = handler;
     }
     },
     // 移除事件
     removeEvent : function(element, type, handler) {
     if (element.removeEnentListener) {
     element.removeEnentListener(type, handler, false);
     } else if (element.datachEvent) {
     element.detachEvent('on' + type, handler);
     } else {
     element['on' + type] = null;
     }
     },
     // 阻止事件 (主要是事件冒泡，因为IE不支持事件捕获)
     stopPropagation : function(ev) {
     if (ev.stopPropagation) {
     ev.stopPropagation();
     } else {
     ev.cancelBubble = true;
     }
     },
     // 取消事件的默认行为
     preventDefault : function(event) {
     if (event.preventDefault) {
     event.preventDefault();
     } else {
     event.returnValue = false;
     }
     },
     // 获取事件目标
     getTarget : function(event) {
     return event.target || event.srcElement;
     },
     // 获取event对象的引用，取到事件的所有信息，确保随时能使用event；
     getEvent : function(e) {
     var ev = e || window.event;
     if (!ev) {
     var c = this.getEvent.caller;
     while (c) {
     ev = c.arguments[0];
     if (ev && Event == ev.constructor) {
     break;
     }
     c = c.caller;
     }
     }
     return ev;
     }
     };
### 10.["1", "2", "3"].map(parseInt) 答案是多少？
    为何返回不是 [1,2,3] 却是 [1,NaN,NaN]？原因：parseInt接收的是两个参数，map传递的是3个参数。
    (1)parseInt函数：parseInt(string, radix);string: 需要转化的字符，如果不是字符串会被转换，忽视空格符。radix：数字2-36之前的整型。默认使用10，表示十进制。需要注意的是，如果radix在2-36之外会返回NaN。
    （2）map函数：arr.map(callback[,thisArg]);

### 11.什么是闭包（closure），为什么要用它？
    闭包指的是一个函数可以访问另一个函数作用域中变量的函数。常见的构造方法，是在一个函数内部定义另外一个函数。内部函数可以引用外层的参数和变量；参数和变量不会被垃圾回收机制回收。注意，闭包的原理是作用域链，所以闭包访问的上级作用域中的变量是个对象，其值为其运算结束后的最后一个值。除非用立即执行函数来解决。

### 12.new操作符具体干了什么呢?
    1、创建一个空对象，并且 this 变量引用该对象，同时还继承了该函数的原型。p._proto_ =Base.prototype;
    2、属性和方法被加入到 this 引用的对象中。Base.call(p/this)
    3、新创建的对象由 this 所引用，并且最后隐式的返回 this 。

### 13.用原生JavaScript的实现过什么功能吗？

    （1）显示和隐藏
     jq：
     $(el).show();
     $(el).hide();

     js：
     el.style.display = '';
     el.style.display = 'none';
    （2）淡入淡出
     jq：$(el).fadeIn();　　
     js：function fadeIn(el) {
     var opacity = 0;

     el.style.opacity = 0;
     el.style.filter = '';

     var last = +new Date();
     var tick = function() {
     opacity += (new Date() - last) / 400;
     el.style.opacity = opacity;
     el.style.filter = 'alpha(opacity=' + (100 * opacity)|0 + ')';

     last = +new Date();

     if (opacity < 1) {  
     (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick,
     16);
     }
     };

     tick();
     }

     fadeIn(el);

### 14.Javascript中，有一个函数，执行时对象查找时，永远不会去查找原型，这个函数是？
     Object.hasOwnProperty(proName)：是用来判断一个对象是否有你给出名称的属性或对象。不过需要注意的是，此方法无法检查该对象的原型链中是否具有该属性，该属性必须是对象本身的一个成员。判断对象是否有某个特定的属性。必须用字符串指定该属性。（例如，o.hasOwnProperty("name")）。
### 15.对JSON的了解？
    JSON或者JavaScript对象标志（JavaScript Object Notation）是JavaScript的一个子集，它主要用于定义诸如整型、布尔型或者数组类型的数据。javascript提供方法来对其进行解析，因此在Javascript中使用JSON是很容易的，它的格式可以很容易地被任何语言解析。Json的基本结构是使用“{}”来包住对象，该对象包含键和值以冒号分隔，键值对之间以逗号分界，字符串要被包在双引号（""）中，并且对象的键名字始终都是一个字符串，属性值可以使任何Json支持的数据类型，包括字符串、其他对象类型、数字以及布尔类型(true或者false)、一个指定的空值和数组。Json的数组被“[]”包住，数组元素的类型可以是任何json数据类型（包括对象和数组），数组元素之间以“,”进行分隔。
### 16.Ajax 是什么? 如何创建一个Ajax？
    Ajax 是一种异步请求数据的一种技术，对于改善用户的体验和程序的性能很有帮助。
    1.创建Ajax核心对象XMLHttpRequest
    ```
      var xmlhttp;  
      if (window.XMLHttpRequest)  
        {// 兼容 IE7+, Firefox, Chrome, Opera, Safari  
        xmlhttp=new XMLHttpRequest();  
        }  
      else  
        {// 兼容 IE6, IE5  
        xmlhttp=newActiveXObject("Microsoft.XMLHTTP");  
        }
    ```  
    2.向服务器发送请求
      xmlhttp.open(method,url,async);  
      send(string)
      注意：open 的参数要牢记，很多面试官爱问这样的细节
        - method：请求的类型；GET 或 POST
        - url：文件在服务器上的位置
        - async： true（异步）或 false（同步）
        send(string)方法post请求时才使用字符串参数，否则不用带参数。

      post请求一定要设置请求头的格式内容
      ```
      xmlhttp.open("POST","ajax_test.html",true);  
      xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");  
      xmlhttp.send("fname=Henry&lname=Ford");  
      ```
      3.服务器响应处理
      responseText    获得字符串形式的响应数据。
      responseXML   获得XML 形式的响应数据。

       3.1 同步处理
       ```
       [javascript] view plain copy 在CODE上查看代码片派生到我的代码片
       xmlhttp.open("GET","ajax_info.txt",false);  
       xmlhttp.send();  
       document.getElementById("myDiv").innerHTML=xmlhttp.responseText;  
       ```
       直接在send()后面处理返回来的数据。

       3.2 异步处理

       异步处理相对比较麻烦，要在请求状态改变事件中处理。
       ```
       [javascript] view plain copy 在CODE上查看代码片派生到我的代码片
       xmlhttp.onreadystatechange=function()  
        {  
        if (xmlhttp.readyState==4 &&xmlhttp.status==200)  
          {  
         document.getElementById("myDiv").innerHTML=xmlhttp.responseText;  
          }  
        }  
        ```
        一共有5中请求状态，从0 到 4 发生变化。

        0: 请求未初始化

        1: 服务器连接已建立

        2: 请求已接收

        3: 请求处理中

        4: 请求已完成，且响应已就绪

        xmlhttp.status：响应状态码。这个也是面试比较爱问的，这个必须知道4个以上，比较常见的有：

        200: "OK"

        403   （禁止） 服务器拒绝请求。

        404   （未找到） 服务器找不到请求的网页。

        408  （请求超时） 服务器等候请求时发生超时。

        500   （服务器内部错误）  服务器遇到错误，无法完成请求。

      （1）ajax的全称：Asynchronous Javascript And XML。所谓异步，在这里简单地解释就是：向服务器发送请求的时候，我们不必等待结果，而是可以同时做其他的事情，等到有了结果它自己会根据设定进行后续操作，与此同时，页面是不会发生整页刷新的，提高了用户体验。
      （2）
          (1)创建XMLHttpRequest对象,也就是创建一个异步调用对象 （考虑IE6的兼容性，newXMLHttpRequest（））;
          (2)创建一个新的HTTP请求,并指定该HTTP请求的方法、URL及验证信息 （xhr.open("get"),"example.php",true）;
          (3)设置响应HTTP请求状态变化的函数
          (4)发送HTTP请求
          (5)获取异步调用返回的数据
          (6)使用JavaScript和DOM实现局部刷新

      http请求过程：
            1、建立tcp连接。
            2、web浏览器向web服务器发送请求指令。
            3、web浏览器发送请求头信息。
            4、web服务器应答。
            5、web服务器发送应答头信息。
            6、web服务器向浏览器发送数据。
            7、web服务器关闭tcp连接。
### 17.DOM操作——怎样添加、移除、移动、复制、创建和查找节点?
  （1）创建新节点

    createDocumentFragment()    //创建一个DOM片段

    createElement()   //创建一个具体的元素

    createTextNode()   //创建一个文本节点

  （2）添加、移除、替换、插入

    appendChild()

    removeChild()

    replaceChild()

    insertBefore()

  （3）查找

    getElementsByTagName()    //通过标签名称

    getElementsByName()    //通过元素的Name属性的值(IE容错能力较强，会得到一个数组，其中包括id等于name值的)

    getElementById()    //通过元素Id，唯一性

    getElementsByClassName //通过元素的类名查找

### 18..call() 和 .apply() 的作用和区别？
    apply()函数有两个参数：第一个参数是上下文，第二个参数是参数组成的数组。如果上下文是null，则使用全局对象代替。如：function.apply(this,[1,2,3]);
    call()的第一个参数是上下文，后续是实例传入的参数序列。如：function.call(this,1,2,3);
### 19.数组对象有哪些原生方法，列举一下？
    赋值方法 （Mutator methods）
    这些方法直接修改数组自身

    pop 和 push
    shift 和 unshift
    splice
    reverse
    sort

    访问方法（Accessor methods）
    这些方法只是返回相应的结果，而不会修改数组本身
    concat
    join
    slice
    toString
    indexOf 和 lastIndexOf * [ECMAScript 5]

    迭代方法（Iteration methods）
    forEach * [ECMAScript 5]
    map * [ECMAScript 5]
    filter * [ECMAScript 5]
    every 和 some * [ECMAScript 5]
    reduce 和 reduceRight * [ECMAScript 5]

    性能测试
    forEach

    pop；删除数组最后一个元素
    push：向数组尾部插入1-N个元素
    shift：删除数组第一个元素
    unshift：再数组头部插入1-N个元素
    splice(index,howMany[,element1[...]])：index规定从何处添加/删除，howMany规定要删除多少，elements规定要添加到数组的新元素
    reverse：颠倒数组中元素的顺序
    sort：如果调用该方法时没有使用参数，将按字母顺序对数组中的元素进行排序。说得更精确点，是按照字符编码的顺序进行排序。如果想按照其他标准进行排序，就需要提供比较函数，该函数要比较两个值，然后返回一个用于说明这两个值的相对顺序的数字。比较函数应该具有两个参数 a 和 b，其返回值如下：
    - 若 a 小于 b，在排序后的数组中 a 应该出现在 b 之前，则返回一个小于 0 的值。
    - 若 a 等于 b，则返回 0。
    - 若 a 大于 b，则返回一个大于 0 的值。
    concat：连接多个数组
    join(separator)：把数组中的所有元素放入一个字符串。其中，元素之间是通过指定的分隔符进行分隔的。默认的分隔符是逗号(,)。
    indexOf：从头开始搜索
    lastindexOf：从尾开始搜索
### 20.JavaScript中的作用域与变量声明提升？
    一个变量的作用域表示这个变量存在的上下文。它指定了你可以访问哪些变量以及你是否有权限访问某个变量。
    变量作用域分为局部作用域和全局作用域。
    所有的变量声明都会提升到函数的开头（如果这个变量在这个函数里面）或者全局作用域的开头（如果这个变量是一个全局变量）
