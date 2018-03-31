/*export*/ function Vec (x, y){
  this.x = x; 
  this.y = y;
}
Vec.prototype.plus = function(other) {
  return new Vec(this.x + other.x, this.y + other.y);
}
Vec.prototype.times = function(factor) {
  return new Vec(this.x * factor, this.y * factor);
}

function Lava(pos, speed, reset) {
    this.pos = pos;
    this.speed = speed;
    this.reset = reset;
    if (ch == "=") {
      return new Lava(pos, new Vec(2, 0));
    } else if (ch == "|") {
      return new Lava(pos, new Vec(0, 2));
    } else if (ch == "v") {
      return new Lava(pos, new Vec(0, 3), pos);
    }
}
Lava.prototype.type = "lava";
Lava.prototype.size = new Vec(1, 1);
//生成不同的岩浆
Lava.prototype.collide = function(state) {
  return new State(state.level, state.actors, "lost");
};//触摸熔岩演员设置游戏状态"lost"
Lava.prototype.update = function(time, state) {
  let newPos = this.pos.plus(this.speed.times(time));
  if (!state.level.touches(newPos, this.size, "wall")) {
    return new Lava(newPos, this.speed, this.reset);
  } else if (this.reset) {
    return new Lava(this.reset, this.speed, this.reset);
  } else {
    return new Lava(this.pos, this.speed.times(-1));
  }
};/*它通过将时间步长和当前速度的乘积加到旧的位置来计算一个新的位置。如果存在障碍物，行为取决于熔岩块的类型 - 滴下的熔岩有一个reset位置，当它碰到某物时它会跳回。弹跳熔岩通过将其乘以-1来反转其速度，以便它开始向相反的方向移动。*/

function Coin(pos, basePos, wobble) {
    this.pos = pos;
    this.basePos = pos.plus(new Vec(0.2, 0.1));;
    this.wobble = wobble;
    return new Coin(basePos, basePos,
                    Math.random() * Math.PI * 2);
}
Coin.prototype.type = "coin";//每个硬币的起始阶段是随机的
Coin.prototype.size = new Vec(0.6, 0.6);
//存储一个基本位置以及一个wobble跟踪弹跳运动的相位的属性
Coin.prototype.collide = function(state) {
  let filtered = state.actors.filter(a => a != this);
  let status = state.status;
  if (!filtered.some(a => a.type == "coin")) status = "won";
  return new State(state.level, filtered, status);
};//硬币在你触摸时消失，并将状态设置为"won"这是最后一枚硬币的时间。
var wobbleSpeed = 8, wobbleDist = 0.07;
Coin.prototype.update = function(time) {
  let wobble = this.wobble + time * wobbleSpeed;//该wobble属性会增加以追踪时间
  let wobblePos = Math.sin(wobble) * wobbleDist;//参数Math.sin来查找波形上的新位置。然后从其基本位置和基于该波形的偏移计算硬币的当前位置。
  return new Coin(this.basePos.plus(new Vec(0, wobblePos)),
                  this.basePos, wobble);
};

function Player(pos, speed){
    this.pos = pos;
    this.speed = speed;
    return new Player(pos.plus(new Vec(0, -0.5)),
                      new Vec(0, 0));
}//它的初始位置被设置为比该@角色出现的位置高半个方格，使它的底部与它出现的方形底部对齐。

Player.prototype.type = "player";
Player.prototype.size = new Vec(0.8, 1.5);
//存储其当前速度的属性，以模拟动量和重力
Player.prototype.update = function(time, state, keys) {
  let xSpeed = 0;
  if (keys.ArrowLeft) xSpeed -= playerXSpeed;
  if (keys.ArrowRight) xSpeed += playerXSpeed;
  let pos = this.pos;
  let movedX = pos.plus(new Vec(xSpeed * time, 0));
  if (!state.level.touches(movedX, this.size, "wall")) {
    pos = movedX;
  }//玩家的运动按每个轴单独处理，因为碰到地板不应妨碍水平运动，撞墙不应停止坠落或跳跃运动。

  let ySpeed = this.speed.y + time * gravity;//玩家的垂直速度（ySpeed）首先加速以应对重力。
  let movedY = pos.plus(new Vec(0, ySpeed * time));
  if (!state.level.touches(movedY, this.size, "wall")) {
    pos = movedY;
  } else if (keys.ArrowUp && ySpeed > 0) {
    ySpeed = -jumpSpeed;
  } else {
    ySpeed = 0;
  }
  return new Player(pos, new Vec(xSpeed, ySpeed));
};//它为事件注册事件处理程序，"keydown"并且"keyup"当事件中的密钥代码存在于正在跟踪的代码集中时，会​​更新对象。

function overlap(actor1, actor2) {//使用该overlap功能检测演员之间的重叠。它需要两个actor对象，并在它们触摸时返回true - 当它们沿着x轴和沿着y轴重叠时
  return actor1.pos.x + actor1.size.x > actor2.pos.x &&
         actor1.pos.x < actor2.pos.x + actor2.size.x &&
         actor1.pos.y + actor1.size.y > actor2.pos.y &&
         actor1.pos.y < actor2.pos.y + actor2.size.y;
}
var playerXSpeed = 7;


var gravity = 30;
var jumpSpeed = 17;

module.exports = Vec; 

// function Monster(pos, plan){
//     return new Monster(pos.plus(new Vec(0, -1)));
// }
// Monster.prototype.type = "monster";
// Monster.prototype.size = new Vec(1.2, 2);
// Monster.prototype.update = function(time, state){
//   let newPos = this.pos.plus(this.speed.times(time));
//   if (!state.level.touches(newPos, this.size, "wall")) {
//     return new Lava(newPos, this.speed, this.reset);
//   } else if (this.reset) {
//     return new Lava(this.reset, this.speed, this.reset);
//   } else {
//     return new Lava(this.pos, this.speed.times(-1));
//   }
// }
// Monster.prototype.collide = function(state){
//   let filtered = state.actors.filter(a => a != this);
//   let status = state.status;
//   if (!filtered.some(a => a.type == "monster")) status = "won";
//   return new State(state.level, filtered, status);
// }
// levelChars["M"] = Monster;





