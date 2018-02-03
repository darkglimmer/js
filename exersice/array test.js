//1.
function digitCounts(k, n) {
    var result = [];
    for(i = 0; i < n+1; i++){
        result.push(i);
    }
    return result.toString().split(k).length-1;
}

//2.??
Map.prototype.filterKeys = function(key) {
    var string = new Map.filter(
      function (key,value) {
          return (key.indexOf(key) > -1);
      }
  );
  return string;
  }
  
  Map.prototype.filterValues = function(val) {
      var number = new Map.filter(
      function (key,value) {
          return (value >= val);
      }
  );
  return number;
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
