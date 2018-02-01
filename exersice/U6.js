function speak(line) {
    console.log("The " + this.type + " rabbit says '" + line + "'");//this.type这种方法会找到对象中对应的属性直接调用
  }
  var whiteRabbit = {type: "white", speak: speak};
  var fatRabbit = {type: "fat", speak: speak};
  
  whiteRabbit.speak("Oh my ears and whiskers, " +
                    "how late it's getting!");
  // → The white rabbit says 'Oh my ears and whiskers, how
  //   late it's getting!'
  fatRabbit.speak("I could sure use a carrot right now.");
  // → The fat rabbit says 'I could sure use a carrot
  //   right now.'

  //在调用object.method（）时，对象中的一个特殊变量this就会指向当前方法所属的对象
  //apply，bind接受的第一个参数可以用来模拟对象中方法的调用。——把第一个参数复制给this
  //call，像普通函数一样接受参数，传递一个特定的this值
  speak.apply(fatRabbit, ["Burp!"]);
// → The fat rabbit says 'Burp!'
speak.call({type: "old"}, "Oh my.");
// → The old rabbit says 'Oh my.'

//区别apply、call、bind：[https://www.cnblogs.com/coco1s/p/4833199.html]

//对象的原型是另一个对象，是对象的一个属性来源。空对象的原型是，Object.prototype，是所有对象中原型的父原型。
console.log(Object.prototype.toString.call([1, 2]));
// → [object Array]
//函数继承自Function.prototype,数组继承Array.prototype。
//Object.getPrototypeOf函数返回结果是对象原型。

//直接从公有原型中构造函数来创建对象，调用函数之前添加new表示调用其构造函数。构造函数中包含了指向新对象的变量this。
//构造函数的名称一般以大写字母开头，便于区别。
function Rabbit(type) {
    this.type = type;
  }//构造函数建立了对象的属性与原型之间的关联。
  
  var killerRabbit = new Rabbit("killer");
  var blackRabbit = new Rabbit("black");
  console.log(blackRabbit.type);
  // → black

Rabbit.prototype.speak = function(line) {
    console.log("The " + this.type + " rabbit says '" + line + "'");//将原型对象作为对象的属性
  };
  blackRabbit.speak("Doom...");
  // → The black rabbit says 'Doom...'


  //用for/in循环遍历对象时会到对象原型中寻找属性。方式一：通过hasOwnproperty来搜索对象自身。
  var map = {};
  console.log(map.hasOwnProperty("toString"));
// → false
//方式二：传递null作为原型，并创建一个无原型对象。
var map = Object.create(null);
map["pizza"] = 0.069;
//可枚举和不可枚举
console.log("toString" in map);
// → true

//get或set用于指定属性的读取和修改函数
var pile = {
    elements: ["eggshell", "orange peel", "worm"],
    get height() {
      return this.elements.length;
    },
    set height(value) {
      console.log("Ignoring attempt to set height to", value);
    }
  };
  console.log(pile.height);
  // → 3
  pile.height = 100;
  // → Ignoring attempt to set height to 100

//instanceof判断是否继承

//Task：
function rowHeights(rows) {
    return rows.map(function(row) {
      return row.reduce(function(max, cell) {
        return Math.max(max, cell.minHeight());
      }, 0);
    });
  }
  function colWidths(rows) {
    return rows[0].map(function(_, i) {
      return rows.reduce(function(max, row) {
        return Math.max(max, row[i].minWidth());
      }, 0);
    });
  }
  //计算每列的最小宽度和每行的最大高度，二维数组
  function drawTable(rows) {
    var heights = rowHeights(rows);
    var widths = colWidths(rows);
  
    function drawLine(blocks, lineNo) {
      return blocks.map(function(block) {
        return block[lineNo];
      }).join(" ");//空格链接所有行内内容
    }
    function drawRow(row, rowNum) {
      var blocks = row.map(function(cell, colNum) {
        return cell.draw(widths[colNum], heights[rowNum]);//二次循环得到每行每列具体对应的单元格内容（每块是一个字符串数组）
      });
      return blocks[0].map(function(_, lineNo) {
        return drawLine(blocks, lineNo);
      }).join("\n");//换行符链接每行结果
    }
    return rows.map(drawRow).join("\n");
  }
  //绘制表格
  function repeat(string, times) {
    var result = "";
    for (var i = 0; i < times; i++)
      result += string;
    return result;
  }//连接string参数。
  
  function TextCell(text) {
    this.text = text.split("\n");
  }//split将字符串分割成数组，数组中每个元素是一行文本。
  TextCell.prototype.minWidth = function() {
    return this.text.reduce(function(width, line) {
      return Math.max(width, line.length);
    }, 0);
  };
  TextCell.prototype.minHeight = function() {
    return this.text.length;
  };
  TextCell.prototype.draw = function(width, height) {
    var result = [];
    for (var i = 0; i < height; i++) {
      var line = this.text[i] || "";
      result.push(line + repeat(" ", width - line.length));
    }
    return result;
  };//用dawn的方法向每行文本中填充空格，使得每行文本都能满足最小长度的需求。
  //创建文本单元格
  function UnderlinedCell(inner) {
    this.inner = inner;
  }
  UnderlinedCell.prototype.minWidth = function() {
    return this.inner.minWidth();
  };
  UnderlinedCell.prototype.minHeight = function() {
    return this.inner.minHeight() + 1;
  };
  UnderlinedCell.prototype.draw = function(width, height) {
    return this.inner.draw(width, height - 1)
      .concat([repeat("-", width)]);
  };
  //添加下划线类型单元格

  function dataTable(data) {
    var keys = Object.keys(data[0]);
    var headers = keys.map(function(name) {
      return new UnderlinedCell(new TextCell(name));
    });
    var body = data.map(function(row) {
      return keys.map(function(name) {
        return new TextCell(String(row[name]));
      });
    });
    return [headers].concat(body);
  }
  console.log(drawTable(dataTable(MOUNTAINS)));  
//创建完整表格（没有右对齐）

function RTextCell(text) {
    TextCell.call(this, text);
  }
  RTextCell.prototype = Object.create(TextCell.prototype);
  RTextCell.prototype.draw = function(width, height) {
    var result = [];
    for (var i = 0; i < height; i++) {
      var line = this.text[i] || "";
      result.push(repeat(" ", width - line.length) + line);//与TextCell不同在于让空格填充在左侧，这样就可以完成右对齐
    }
    return result;
  };//新构造函数，并在原型中添加三个方法
  //通过继承的方法，调用旧的构造函数（使用call的方法将新的对象作为旧的构造函数的this值），所有新类型的实例都可以访问旧原型中的属性。
  //最后将一些属性添加到新的原型中并覆盖这些属性。
  function dataTable(data) {
    var keys = Object.keys(data[0]);
    var headers = keys.map(function(name) {
      return new UnderlinedCell(new TextCell(name));
    });
    var body = data.map(function(row) {
      return keys.map(function(name) {
        var value = row[name];
        // This was changed:只对height部分进行右对齐
        if (typeof value == "number")
          return new RTextCell(String(value));
        else
          return new TextCell(String(value));
      });
    });
    return [headers].concat(body);
  }
  
  console.log(drawTable(dataTable(MOUNTAINS)));
  // 完成绘制


  //6.14.1
  function Vector(x, y) {
    this.x = x;
    this.y = y;
  }
  
  Vector.prototype.plus = function(second) {
    return new Vector(this.x + second.x, this.y + second.y);
  };
  Vector.prototype.minus = function(second) {
    return new Vector(this.x - second.x, this.y - second.y);
  };
  Object.defineProperty(Vector.prototype, "length", {
    get: function() {
      return Math.sqrt(this.x * this.x + this.y * this.y);
    }
  });  //6.10 get添加新的属性。

//6.14.2
function StretchCell(inner, width, height) {
    this.inner = inner;
    this.width = width;
    this.height = height;
  }
  
StretchCell.prototype.minWidth = function() {
    return Math.max(this.width, this.inner.minWidth());
  };
  StretchCell.prototype.minHeight = function() {
    return Math.max(this.height, this.inner.minHeight());
  };

  StretchCell.prototype.draw = function(width, height) {
    return this.inner.draw(width, height);
  };
  //??
  StretchCell.prototype.draw = function(width, height) {
    var result = [];
    for (var i = 0; i < height; i++) {
      var line = this.inner [i]|| "";
      result.push(line + repeat(" ", width - line.length));
     }
    return result;
  };

