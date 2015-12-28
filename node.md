# training
this is training

var array = [3,4,2,1,6,5,7,234,54,23];

取这个数据中最大的一项，有一个好方法

var max=Math.max.apply(null,array)

apply的一个巧妙的用处,可以将一个数组默认的转换为一个参数列表([param1,param2,param3]) 转换为 (param1,param2,param3) 

var arr1=[1,3,4];
var arr2=[3,4,5];
Array.prototype.push.apply(arr1,arr2);

从数组随机取值
var arr = [{},{},{}]
Math.random() * arr.length  //随机数
var index = Math.floor(Math.random() * arr.length);
return arr[index]
 


