
importScripts("./test.js");

console.log(sum(10,20));

this.onmessage = function(e){
  console.log(e.data);
  // alert(e.data);此处无法使用alert方法
};

/*
//当前的work.js 中无法直接操作dom对象
var h = document.getElementById('h');
console.log(h);
*/

//给主线程发送数据

var num = 0;
setInterval(function(){
  postMessage({
    num: num++,
    time: new Date().getSeconds()
  });
}, 1000);
