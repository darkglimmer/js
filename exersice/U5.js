//高阶函数
//forEach，现场创建一个函数值，用于遍历数组元素
function gatherCorrelations(journal) {
    var phis = {};
    journal.forEach(function(entry) {
      entry.events.forEach(function(event) {//两层循环
        if (!(event in phis))
          phis[event] = phi(tableFor(event, journal));
      });
    });
    return phis;
  }
//JSON格式，所有属性名都必须用双引号括起来，而且只能使用简单的数据表达式，不能填写函数的调用、变量以及任何含有实际计算过程的代码。
var string = JSON.stringify({name: "X", born: 1980});
console.log(string);
// → {"name":"X","born":1980}
console.log(JSON.parse(string).born);
// → 1980

//filter用于过滤一些元素，构造一个新数组。
function filter(array, test) {
    var passed = [];
    for (var i = 0; i < array.length; i++) {
      if (test(array[i]))
        passed.push(array[i]);
    }
    return passed;
  }

  console.log(filter(ancestry, function(person) {
    return person.born > 1900 && person.born < 1925;//过滤条件
  }));
  // → [{name: "Philibert Haverbeke", …}, …]

  //map构建一个新的数组，并通过一个函数处理每个对象，将处理结果放入新数组中。
  function map(array, transform) {
    var mapped = [];
    for (var i = 0; i < array.length; i++)
      mapped.push(transform(array[i]));
    return mapped;
  }

var overNinety = ancestry.filter(function(person) {
  return person.died - person.born > 90;//过滤条件
});
console.log(map(overNinety, function(person) {
  return person.name;//处理方式
}));
// → ["Clara Aernoudts", "Emile Haverbeke",
//    "Maria Haverbeke"]

//reduce将数组元素最终归纳成一个值
function reduce(array, combine, start) {
    var current = start;
    for (var i = 0; i < array.length; i++)
      current = combine(current, array[i]);
    return current;
  }
  console.log(reduce([1, 2, 3, 4], function(a, b) {
    return a + b;//归纳数组元素方式
  }, 0));
  // → 10

  //reduceAncestors用于从家谱中提炼出一个值
  function reduceAncestors(person, f, defaultValue) {
    function valueFor(person) {
      if (person == null)
        return defaultValue;
      else
        return f(person, valueFor(byName[person.mother]),
                         valueFor(byName[person.father]));
    }
    return valueFor(person);
  }
  function sharedDNA(person, fromMother, fromFather) {
    if (person.name == "Pauwels van Haverbeke")
      return 1;
    else
      return (fromMother + fromFather) / 2;//通过reduceAncestors的查找方式来得出DNA传递
  }
  var ph = byName["Philibert Haverbeke"];
  console.log(reduceAncestors(ph, sharedDNA, 0) / 4);
  // → 0.00049

  //apply——方法，调用函数，并使用数组来指定函数参数。
  //bind——方法，用于构建一个新的函数，并预先确定其中一部分的参数
var theSet = ["Carel Haverbeke", "Maria van Brussel","Donald Duck"];
function isInSet(set, person) {
return set.indexOf(person.name) > -1;//确认姓名存在
}

console.log(ancestry.filter(function(person) {
return isInSet(theSet, person);
}));
// → [{name: "Maria van Brussel", …},
//    {name: "Carel Haverbeke", …}]
console.log(ancestry.filter(isInSet.bind(null, theSet)));
// → … same result

//5.14.1
console.log(arrays.reduce(function(a, b) {
    return a.concat(b);
  }));

  //5.14.2
  function average(array) {
    function plus(a, b) { return a + b; }
    return array.reduce(plus) / array.length;
  }
  
  var byName = {};
  ancestry.forEach(function(person) {
    byName[person.name] = person;
  });

  function age(p){ return p.born - byName[p.mother].born; }
  function mother(p){ 
    if(byName[p.mother] != null)
      return byName[p.mother] 
  }
  
  console.log(average(ancestry.filter(mother).map(age)));//map找的是mother的name

  //用person查找
  var differences = ancestry.filter(function(person) {
    return byName[person.mother] != null;
  }).map(function(person) {
    return person.born - byName[person.mother].born;
  });
  
  console.log(average(differences));

  //5.14.3
  function groupBy(array, test) {
    var groups = [];
    array.forEach(function(person) {
      var groupName = test(person);
      if (groupName in groups)
        groups[groupName].push(person);
      else
        groups[groupName] = [person];
    });
    return groups;
  }//传出的是人名的数组

  var Century = groupBy(ancestry, function(person) {
    return Math.ceil(person.died / 100);
  });
  
  for (var i in Century) {
    var ages = Century[i].map(function(person) {
      return person.died - person.born;
    });
    console.log(century + ": " + average(ages));
  }

//5.14.4
function every(array, predicate) {
    for (var i in array) {
      if (!predicate(array[i]))
        return false;
    }
    return true;
  }
  
  function some(array, predicate) {
    for (var i in array) {
      if (predicate(array[i]))
        return true;
    }
    return false;
  }