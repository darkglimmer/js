//toUpperCase 调用字符串属性——返回当前字符串的一个副本，并将当前所有字母都转换成大写字母。
//toLowerCase 调用字符串属性——返回当前字符串的一个副本，并将当前所有字母都转换成小写字母。
//trim用于删除字符串中开头和结尾的空白符号（空格，\n，制表符号等。
//charAt 获取字符串中某个特定的字符==string【1】这种形式

//indexOf 从数组第一个元素向后搜索，lastIndexOf从最后一个元素向前搜索，也可有一个可选参数来指定搜索位置
//slice 接受一个起始索引和一个结束索引，然后返回数组中两个索引范围内的元素。起始索引包含在返回结果中，结束索引不包含——如果只输入一个数，就从这个数开始到结束
console.log([0,1,2,3,4].slice(2));
//[2,3,4]
//push向数组末尾添加值，pop删除数组末尾的值并返回给调用者,join将字符串数组拼成单个字符串，unshift/shift在数据开头添加或者删除元素。
var mack=[];
mack.push("Mack");
mack.push("the","Knife");
console.log(mack);//添加值
//["Mack","the","Knife"]
console.log(mack.join(" "));//连接字符串数组
//Mack the Knife
console.log(mack.pop());//显示删除的数组末尾值
//Knife
console.log(mack);//删除后的数组
//["Mack","the"]
//concat用于拼接两个数据组
function remove(array, index) {
    return array.slice(0, index)
      .concat(array.slice(index + 1));
  }
  console.log(remove(["a", "b", "c", "d", "e"], 2));
  // → ["a", "b", "d", "e"]

//对象的值可以进行修改，但是数字、字符串和布尔值这些类型值的内容无法修改——不是对象
//不能向字符串中添加新的属性
var myString = "Fido";
myString.myProperty = "value";
console.log(myString.myProperty);
// → undefined

//两个对象的属性相同不代表两个对象相同    两个对象相同，属性就相同
//in--遍历对象中包含的属性
var myVar = 10;
console.log("myVar" in window);
// → true
console.log(window.myVar);
// → 10

//arguments指向所有入参对象，length属性——实际传递给函数的参数个数
function noArguments() {}
noArguments(1, 2, 3); // This is okay
function threeArguments(a, b, c) {}
threeArguments(); // And so is this

//Math：.random包含0不包含1的随机小数，.floor向下取整到与当前数字最接近的整数，.ceil向上取整，.round四舍五入

//4.17.1
function range(start,end){
    var a = [];
    for(var i = start; i <= end; i++){
      a.push(i);
    }
    return a;
}
function range(start, end, step) {
    if (step == null) step = 1;
    var a = [];
    if (step > 0) {
      for (var i = start; i <= end; i += step)
        a.push(i);
    } else {
      for (var i = start; i >= end; i += step)
        a.push(i);
    }
    return a;
}
function sum(a) {
    var m = 0;
    for (var i = 0; i < a.length; i++)
      m += a[i];
    return m;
  }
  
//4.17.2
function reverseArray(a) {
  var b = [];
  for (var i = a.length - 1; i >= 0; i--)
    b[a.length - 1 - i]=a[i];
  return b;
}
function reverseArrayInPlace(a) {
  for (var i = 0; i < (a.length / 2); i++) {//可加Math.floor来确保
    var temp = a[i];
    a[i] = a[a.length - 1 - i];
    a[a.length - 1 - i] = temp;
  }
  return a;
}
//reverseArray应用场景更广，reverseArrayInPlace效率高

//4.17.3
function arrayToList(a) {
  var list = null;
  for (var i = a.length - 1; i >= 0; i--)//倒置
    list = {value: a[i], rest: list};
  return list;
}
function listToArray(list) {
  var array = [];
  for (var b = list; b ; b = b.rest){ //b一直为list的rest部分，直到没有rest
    array.push(b.value);
  }
  return array;
}
function prepend(a, list) {
  return {value: a, rest: list};
}
function nth(list, n) {
  var array = listToArray(list);
  if(n <= array.length){
    return array[n];
  }
  else{
    return undefined;
  }
}
//不用listToArray函数
function nth(list, n) {
  if (!list)
    return undefined;
  else if (n == 0)
    return list.value;
  else
    return nth(list.rest, n - 1);
}

//4.17.4


