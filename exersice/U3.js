//3.1
var min=function(a,b){
    return a < b ? a : b;
  }
//3.2
function isEven(n) {
    if (n == 0){
      return true;
    }
    else if (n == 1) {
      return false;
    }
    else if (n < 0) {
      return isEven(-n);
    }
    else {
      return isEven(n - 2);
    }
  }
  
  //3.3
  function countChar(string, m) {
    var number = 0;
    for (var i = 0; i < string.length; i++)
      if (string.charAt(i) == m)
        number ++;
    return number;
  }
  
  function countBs(string) {
    return countChar(string, "B");
  }
  