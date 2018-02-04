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
const mergeSortedArray = function (A, B) {
    return A.concat(B).sort(function(a,b){return a>b?1:-1})//调用sort方法后，数组本身会被改变，即影响原数组
}

//11
