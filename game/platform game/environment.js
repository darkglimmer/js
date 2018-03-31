// import Vec from "./actor"
// Vec();
var Vec = require("./actor");

var levelChars = {
  ".": "empty", "#": "wall", "+": "lava",
  "@": Player, "o": Coin,
  "=": Lava, "|": Lava, "v": Lava
};
//将字符映射到背景网格类型或类的对象。

/*export*/ function level (plan) {
  let rows = plan.trim().split("\n").map(l => [...l]);
  this.height = rows.length;
  this.width = rows[0].length;
  this.startActors = [];
      
  this.rows = rows.map((row, y) => {
    return row.map((ch, x) => {
      let type = levelChars[ch];
      if (typeof type == "string") return type;
      this.startActors.push(
      type.create(new Vec(x, y), ch));
      return "empty";
    });
  });
}//构成关卡
level.prototype.touches = function(pos, size, type) {
    var xStart = Math.floor(pos.x);
    var xEnd = Math.ceil(pos.x + size.x);
    var yStart = Math.floor(pos.y);
    var yEnd = Math.ceil(pos.y + size.y);//计算身体重叠，通过向上和向下四舍五入来获得框接触的背景广场的范围。
  
    for (var y = yStart; y < yEnd; y++) {
      for (var x = xStart; x < xEnd; x++) {
        let isOutside = x < 0 || x >= this.width ||
                        y < 0 || y >= this.height;
        let here = isOutside ? "wall" : this.rows[y][x];
        if (here == type) return true;//true当找到匹配的正方形时，我们循环通过四舍五入坐标找到的网格正方形块并返回。
      }
    }
    return false;
};/*在移动玩家或者一块熔岩之前，我们测试一下这个动作是否会把它带入墙内。如果是这样，我们完全取消这个动作。对这种碰撞的反应取决于演员的类型 - 玩家将停止，而熔岩块将反弹。*/


function State (level, actors, status) {
    this.level = level;
    this.actors = actors;
    this.status = status;

    return this.actors.find(a => a.type == "player");
}//跟踪正在运行的游戏的状态
State.prototype.start = function(level){
  return new State(level, level.startActors, "playing");
}
State.prototype.update = function(time, keys) {
    let actors = this.actors
      .map(actor => actor.update(time, this, keys));
    let newState = new State(this.level, actors, this.status);

    if (newState.status != "playing") return newState;

    let player = newState.player;
    if (this.level.touches(player.pos, player.size, "lava")) {
      return new State(this.level, actors, "lost");
    }
  
    for (let actor of actors) {
      if (actor != player && overlap(actor, player)) {
        newState = actor.collide(newState);
      }
    }
    return newState;
};//状态update方法touches用来确定玩家是否触摸熔岩。

let simpleLevel = new Level(simpleLevelPlan);
console.log(`${simpleLevel.width} by ${simpleLevel.height}`);
//在屏幕上显示这些级别，并在它们内部模拟时间和动作

module.exports = level;