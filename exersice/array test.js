//1.
function digitCounts(k, n) {
    var result = [];
    for(i = 0; i < n+1; i++){
        result.push(i);
    }
    return result.toString().split(k).length-1;
}

//2.
Map.prototype.filterKeys = function(func) {
    return new Map([...this].filter(([k,v]) =>{
        return func(k)
    }));
}
  
Map.prototype.filtervalues = function(func) {
    return new Map([...this].filter(([k,v]) =>{
        return func(v)
    }));
}

//3.
const flatten = (arr) => {
    const result = [];
    (function (arr){
      arr.map(item => {
        if (typeof item === 'number') {
          result.push(item)
        } else {
          arguments.callee(item)//?
        }
      })
    }(arr));
    return result;
}

const flatten = arr => arr.length ? arr.toString().split(',').map(x => parseInt(x)) : []

//4
const arrWithoutLoop = (n) => n <= 0 ? [] : arrWithoutLoop(n - 1).concat(n - 1)

//5
(1)
function makeIterator(array){
    var nextIndex = 0;
    return {
       next: function(){
           return nextIndex < array.length ?
               {value: array[nextIndex++], done: false} :
               {done: true};
       }
    };
}
function flatten2 (arr) {
  return makeIterator(arr.length ? arr.toString().split(',').map(x => parseInt(x)) : [])
}
(2)
function *flatten2(arr) {
    for (let i = 0; i < arr.length; i++) {
      const item = arr[i]
      /* yield* 的使用可以大大简化程序编写 */
      Array.isArray(item) ? yield* flatten2(item) : yield item;//Array.isArray() 用于确定传递的值是否是一个Array,如果是继续传递，如果不是就用生成器存下来
    }
  }

//6
(1)
const parseData =({rows, metaData}) => {
    return rows.map(function(){
    var newData = [];
      for(var i = 0; i < rows.length; i++){
        var newObj = {};
        for(var j = 0; j < metaData.length; j++){
          newObj[metaData[j].name] = rows[i][j];
        }
        newData.push(newObj);
      }
      return newData;
    })
  }
(2)
const parseData = ({rows, metaData}) => rows.map(row => row.reduce((p, c, i) => Object.assign({}, p, {[metaData[i].name]: c}), {}))//??


//7
const fillEmpty = (arr) => {Array.from(arr).map((v,i)=>{if(!(i in arr)) arr[i]='Hello' })}        
//map方法--会给原数组中的每个元素都按顺序调用一次callback函数,callback每次执行后的返回值（包括 undefined）组合起来形成一个新数组
//重点:callback函数只会在有值的索引上被调用，而那些从来没被赋过值或者使用delete删除的索引则不会被调用
//Array.from可以将数组空元素设为undefined.   所以：只有Array.from(a),map才会调用callback函数作用于原来的空元素
//array可以有空槽,ength会算空槽 undefined!=空槽 undefined属于有值的情况 

//8
//正则表达式

//9
const uniqueNums = (n) => {
    const ret = []
    for (let i = 0; i < n; i++) {
      let rand = -1
      do rand = Math.round(Math.random() * 30 + 2); while(ret.includes(rand))
      ret.push(rand)
    }
    return ret
  }

//10
(1)
const mergeSortedArray = function (A, B) {
    return A.concat(B).sort(function(a,b){return a>b?1:-1})//调用sort方法后，数组本身会被改变，即影响原数组
}
//sort()中定义了一个比较方式，和0比较，如果大于0，就把b排在a前。
//如果不对sort()定义就通过ascii码比较

(2)
const mergeSortedArray = function (A, B) {
    return A.concat(B).sort(function(a,b){return a.index - b.index;})
}

//11
const partitionArray = function (nums, k) {
    var arr = nums.sort(function(a,b){return a>b?1:-1});
    for(var i = 0; i < arr.length; i++){
        if(arr[i] >= k){
            return i;
        }
    }
    return arr.length;//如果是空数组
}

//12
(1)
const unique = (arr) => {
    var result = [];
    for(var i in arr){
      if(result.indexOf(arr[i]) == -1){
        result.push(arr[i]);
      }
    }
    return result;
  }
(2)
const unique = (arr) => [...new Set(arr)]//new Set([iterable]); Set 中的值总是唯一的,NaN和undefined都可以被存储在Set 中， NaN之间被视为相同的值
//如果传递一个可迭代对象，它的所有元素将被添加到新的 Set中。如果不指定此参数或其值为null，则新的 Set为空。

(3)
const unique = (arr)  => Array.from(new Set(arr))//从一个类似数组或可迭代对象中创建一个新的数组实例。

//13
(1)
const injectSections = (items, sections) => {
    sections.sort(function(a,b){return a.index>b.index?1:-1;})
    for(var i = 0; i < sections.length; i++){
        items.splice(sections[i].index+i, 0, sections[i].content)//sections[i].index+i加i是为了保证顺序
    }
    return items
  }
//倒序传入
  const injectSections = (items, sections) => {
    sections.sort((a,b) => b.index - a.index)
    sections.forEach((m)=>{
        items.splice(m.index, 0, m.content)
      })
    return items
  }
//splice() 方法通过删除现有元素和/或添加新元素来更改一个数组的内容。
  myFish.splice(2, 0, 'drum'); // 在索引为2的位置插入'drum'
// myFish 变为 ["angel", "clown", "drum", "mandarin", "sturgeon"]

myFish.splice(2, 1); // 从索引为2的位置删除一项（也就是'drum'这一项）
// myFish 变为 ["angel", "clown", "mandarin", "sturgeon"]

(2)
const injectSections = (items, sections) => {
    const res = items.map(item => [item]);
    sections.forEach(section => {
      res[section.index].unshift(section.content);
    })
    return Array.prototype.concat.apply([], res)//将一个个独立数组结合起来
}

//14
(1)
function solution(arr1,arr2){
    var result = [];
    for(var i in arr1){
        if(arr2.indexOf(arr1[i]) > -1 && result.indexOf(arr1[i]) == -1){
            result.push(arr[i]);
        }
    }
    return result;
}
(2)
function solution(arr1,arr2){
    return a.filter(v => b.includes(v))//ES7
}
(3)
function solution(arr1,arr2){
    return Array.from(new Set(a.filter(v => bSet.has(v))))//ES6
}
//15
function solution(arr1, arr2) {
    var result = [];
     for(var i in arr1){
         if(arr2.indexOf(arr1[i]) > -1){
             var num = arr2.indexOf(arr1[i])
             result.push(arr[i]);
             while(arr1[i++] == arr2[num++])
             result.push(arr[i]);
         }
     }
     return result;
 };

//16
const isAnagram = (str1, str2) =>{
    return str1.split("").sort().join('') === str2.split("").sort().join('');
 }
//字符串转换成数组再转换成字符串 