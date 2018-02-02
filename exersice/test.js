//自测练习

1.
console.log(a.b) //1
console.log(new a().b) //2
console.log(foo.c) //5
console.log(foo.d) //4

2.
console.log(bar.a)//2

3.
console.log("toString" in map); //false
console.log("toString" in map); //ture
console.log("a" in map); //ture

4.
//构造函数建立了对象的属性与原型之间的关联。返回关于对象的字符串形式

5.
//Object.defineProperty() 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象。
//Object.defineProperty(obj, prop, descriptor)
//当writable属性设置为false时，该属性被称为“不可写”。它不能被重新分配。默认为 false。
console.log(delete a.foo)//false
console.log(delete a.bar)//ture
console.log(a.foo)//hi
for (var key in a){
    console.log(key);
  }//  
console.log("foo" in a);//ture
console.log("bar" in a);//false

task1
1.
function Person(name, age){
    this.name = name;
    this.age = age;
}
Person.prototype.introduce = function(){
    console.log("I am " + this.name + ", I am " + this.age + " years old!");
};

2.
function Person(name, age){
  this.name = name;
  this.age = age;
  this.introduce= function() {
    console.log("I am " + this.name + ", I am " + this.age + " years old!");
  };
}
task2
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

