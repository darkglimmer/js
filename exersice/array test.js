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
(1)
const extractStr = (str) => {
    let result = []
    let strArr = str.split(":")
    for (var i = 1;i< strArr.length;i++){//从1开始因为第一个没有两个数组可以分
      if(strArr[i].split(".").length > 1){
        result.push(strArr[i].split(".")[0])//输出以"."划分后的第一个数组
      }
    }
    return result
  }
(2)
const extractStr = (str) => /* TODO */
{
    let result = [];
    let targets = str.split(".").slice(0, -1);//去除空数组
    targets.forEach(target=>{
        let position = target.lastIndexOf(":");//lastIndexOf() 方法可返回一个指定的字符串值最后出现的位置
        if( position >= 0){
            result.push(target.substring(position + 1));//substring() 方法用于提取字符串中介于两个指定下标之间的字符。
        }
    });
    return result;
}

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

//17
(1)
function duplicates(arr) {
    var a = arr.sort();    
    var b=[];
    for(var i in a){
        if(a[i]==a[i-1] && b.indexOf(a[i])==-1){
            b.push(a[i]); 
        }
    }
    return b;
}

(2)
function duplicates(arr) {
  return arr.sort().filter((_, i) =>
    arr[i] === arr[i + 1] && arr[i] !== arr[i - 1]
  );
}

//18
(1)
const merge = (arr) => {
    let i = 0, len = arr.length, mid = len >> 1 , n = mid, arr2 = []
    //右移运算符“>>”  后面接使指定值的所有位都右移规定的次数。
    //右移一位相当于除2，右移n位相当于除以2的n次方。
	while(i < n && mid < len) {
		if(arr[i] < arr[mid]){
		  arr2.push(arr[i++])
		} else {
			arr2.push(arr[mid++])
		}
	}
	if(mid == len) {
		arr.splice(0, 0, ...arr.splice(- len + n))
	}
	arr.splice(0, arr2.length, ...arr2)
}
(2)
const merge = (arr) => 
arr.forEach((v,i)=>{arr.push(...arr.splice(arr.indexOf(Math.min.apply(null,arr.slice(0,arr.length-i))),1));
});
//splice() 方法向/从数组中添加/删除项目，然后返回被删除的项目。可删除从 index 处开始的零个或多个元素，并且用参数列表中声明的一个或多个值来替换那些被删除的元素。

//19


//20
const rob = (nums) => {
    var i = 0, e = 0;
    for (var k = 0; k < nums.length; k++) {
      var tmp = i;
      i = nums[k] + e;
      e = Math.max(tmp, e);
    }
    return Math.max(i, e);
  }

//21
(1)
const compose = (...fuc) => {
    return (x) => {
      for(let i = fuc.length - 1; i>=0 ;i--){
        x = fuc[i](x) 
      }
      return x
    }
  }

(2)
const compose = (...fns) => (data) => fns.reverse().reduce((data, fn) => fn(data), data)
//reverse()将输入的内容倒置
(3)
const compose = (...funs) => (i) => funs.reduceRight((pre, cur) => cur(pre), i)

//22
var threeSum = function(nums) {
    var result = [];
    nums.sort((a,b) => a.index - b.index);
    var len = nums.length;
    for(var i = 0; i < len - 2; i++){
        if(nums[i] > 0){
            break;
        }//若num[i]>0则之后无法凑成0
        var j = i + 1; k = len - 1;
        while(j < k){
            var a = nums[i], b = nums[j], c = nums[k];//在i到len-1中凑成0
            var sum = a + b + c;
            if(sum < 0){
                j++;
            }
            else if(sum > 0){
                k--;
            }
            else{
                result.push([a,b,c]);
                while(nums[j] == b && j < k){
                    j++;
                }
                while(nums[k] == c && j < k){
                    k--;
                }
            }
        }
        while(nums[i + 1] == nums[i] && i < len - 2){
            i++;
        }
    }
    return result;
    
};

//23
var threeSumClosest = function(nums, target) {
    var result,close;
    nums.sort((a,b) => a.index - b.index);//从小到大排序
    var len = nums.length;
    for(var i = 0; i < len - 2; i++){
        var j = i + 1; k = len - 1;
        if(i == 0){
            close = Math.abs(target - (nums[i] + nums[j] + nums[k]));
        }
        while(j < k){
            var sum = nums[i] + nums[j] + nums[k];
            if(sum < target){
                if(target - sum <= close){
                    close = target - sum;
                    result = sum;
                }
                j++;
            }
            else if(sum > target){
                if(sum - target <= close){
                    close = sum - target;
                    result = sum;
                }
                k--;
            }
            else{
                close = 0;
                return target;
            }
        }
        while(nums[i + 1] == nums[i] && i < len - 2){
            i++;
        }
    }
    return result;
};

//24
(1)
const partition = (arr) => {
    var first = arr[0]
    for (var i = 1; i < arr.length; i++) {
        if (arr[i] <= first) {
            var j = i
            while (arr[j - 1] && arr[j - 1] >= first) {
                var t = arr[j]
                arr[j] = arr[j - 1]
                arr[j - 1] = t
                j--//与所有比arr[0]小的数交换位置
            }
        }
    }
  }
  (2)
  const partition = (arr) => {
    const swap = (a, i, j) => [a[i], a[j]] = [a[j], a[i]]//换位
    
    const v = arr[0]
    let i = 0
    let k = 1
    let j = arr.length - 1
    
    while(k <= j) {
      if(arr[k] < v) swap(arr, i++, k++)
      else if(arr[k] > v) swap(arr, j--, k)
      else k++
    }
  }

//25
var searchRange = function(nums,target){
    if(nums.indexOf(target) == -1)
        return [-1,-1];
    let result = [];
    if(nums.reverse().indexOf(target) != nums.indexOf(target)){
        result.push(nums.indexOf(target))
        result.push(nums.reverse().indexOf(target))
    }
    else{
        result.push(nums.length - 1);
    }
    return result;
};

//26
var rotate = function(matrix) {
    var n = matrix.length;
    for(var i = 0; i < n / 2; i++){
        for(var j = i; j < n - 1 - i; j++){
            var temp = matrix[i][j];
            matrix[i][j] = matrix[n - 1 - j][i];
            matrix[n - 1 - j][i] = matrix[n - 1 - i][n - 1 - j];
            matrix[n - 1 - i][n - 1 - j] = matrix[j][n - 1 - i];
            matrix[j][n - 1 - i] = temp; 
        }
    }
};

//27
//两个皇后不处于同一行，同一列或一条对角线上。

//28

//29
(1)
const safeGet = (data, path) => {
    let p = path.split('.');
    for(let i=0;i<p.length;i++){
      if(i===p.length-1){
        return data[p[i]]
      }else{
        if(typeof data[p[i]] !== 'object'){
          return undefined
        }else{
          data = data[p[i]]
        }
      }
    }
  }

(2)
const safeGet = (data, path) => {
    return path.split('.').reduce((d,i)=>{return typeof d == 'undefined' ? d : d[i];},data);
}
//reduce逐步拓展

//30

//31
(1)
const getPageTags = () => {
    var doms = document.getElementsByTagName('*')//获取页面元素
    return [...new Set([...doms].map(dom => dom.tagName))] 
}

(2)
const getPageTags = () => {
    var doms = document.getElementsByTagName('*')//取得所有标签，doms是对象
    var s = new Set([].slice.call(doms).map(dom => dom.tagName));//将doms分为一个对象数组，
    return Array.from(s);//将集合转化为数组
}
