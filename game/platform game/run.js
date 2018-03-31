import level from "./environment"
import GAME_LEVELS from"./environment"

function elt(name, attrs, ...children) {
    let dom = document.createElement(name);
    for (let attr of Object.keys(attrs)) {
      dom.setAttribute(attr, attrs[attr]);
    }
    for (let child of children) {
      dom.appendChild(child);
    }
    return dom;
  }//创建一个元素并给它一些属性和子节点

function DOMDisplay (parent, level) {
      this.dom = elt("div", {class: "game"}, drawGrid(level));
      this.actorLayer = null;//追踪包含参与者的元素，以便它们可以轻松移除和替换。
      parent.appendChild(this.dom);
}
DOMDisplay.prototype.setState = function(state) {
    if (this.actorLayer) this.actorLayer.remove();
    this.actorLayer = drawActors(state.actors);
    this.dom.appendChild(this.actorLayer);
    this.dom.className = `game ${state.status}`;
    this.scrollPlayerIntoView(state);
  };//我们需要大量额外的簿记才能将对象与DOM元素相关联，并确保在对象消失时删除元素。
DOMDisplay.prototype.scrollPlayerIntoView = function(state) {
    let width = this.dom.clientWidth;
    let height = this.dom.clientHeight;
    let margin = width / 3;
  
    // The viewport
    let left = this.dom.scrollLeft, right = left + width;
    let top = this.dom.scrollTop, bottom = top + height;
  
    let player = state.player;
    let center = player.pos.plus(player.size.times(0.5))
                           .times(scale);
  
    if (center.x < left + margin) {
      this.dom.scrollLeft = center.x - margin;
    } else if (center.x > right - margin) {
      this.dom.scrollLeft = center.x + margin - width;
    }
    if (center.y < top + margin) {
      this.dom.scrollTop = center.y - margin;
    } else if (center.y > bottom - margin) {
      this.dom.scrollTop = center.y + margin - height;
    }
};
DOMDisplay.prototype.clear = function() {
  this.dom.remove();
};

var scale = 20;//scale常数给出了单个单位在屏幕上占用的像素数量
function drawGrid(level) {
    return elt("table", {//背景被绘制为一个<table>元素
      class: "background",
      style: `width: ${level.width * scale}px`
    }, ...level.rows.map(row =>
      elt("tr", {style: `height: ${scale}px`},//网格的每一行都变成一个表格行
          ...row.map(type => elt("td", {class: type})))
    ));
}

function drawActors(actors) {
    return elt("div", {}, ...actors.map(actor => {
      let rect = elt("div", {class: `actor ${actor.type}`});
      rect.style.width = `${actor.size.x * scale}px`;
      rect.style.height = `${actor.size.y * scale}px`;
      rect.style.left = `${actor.pos.x * scale}px`;
      rect.style.top = `${actor.pos.y * scale}px`;
      return rect;
    }));
}//一个DOM元素并基于该actor的属性设置该元素的位置和大小来绘制每个actor。值必须乘以scale从游戏单位到像素。

function runAnimation(frameFunc) {
  let lastTime = null;
  function frame(time) {
    if (lastTime != null) {
      let timeStep = Math.min(time - lastTime, 100) / 1000;
      if (frameFunc(timeStep) === false) return;
    }
    lastTime = time;
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}
function runLevel(level, Display) {
let display = new Display(document.body, level);
let state = State.start(level);
let ending = 1;
return new Promise(resolve => {
  runAnimation(time => {
    state = state.update(time, arrowKeys);
    display.setState(state);
    if (state.status == "playing") {
      return true;
    } else if (ending > 0) {
      ending -= time;
      return true;
    } else {
      display.clear();
      resolve(state.status);
      return false;
    }
  });
});
}//通过按Esc键可以暂停（暂停）和取消暂停游戏。
function trackKeys(keys) {
let down = Object.create(null);
function track(event) {
  if (keys.includes(event.key)) {
    down[event.key] = event.type == "keydown";
    event.preventDefault();
  }
}
window.addEventListener("keydown", track);
window.addEventListener("keyup", track);
return down;
}
var arrowKeys = trackKeys(["ArrowLeft", "ArrowRight", "ArrowUp"]);

function runLevel(level, Display) {//接受一个Level对象和一个显示构造函数，并返回一个promise。
  let display = new Display(document.body, level);
  let state = State.start(level);
  let ending = 1;
  return new Promise(resolve => {
    runAnimation(time => {
      state = state.update(time, arrowKeys);
      display.setState(state);
      if (state.status == "playing") {
        return true;
      } else if (ending > 0) {
        ending -= time;
        return true;
      } else {
        display.clear();
        resolve(state.status);
        return false;
      }
    });
  });
}/*等级完成（失败或获胜）后，再runLevel等待一秒（让用户看到会发生什么），然后清除显示，停止动画并解析对游戏结束状态的承诺。*/
async function runGame(plans, Display) {
for (let level = 0; level < plans.length;) {
  let status = await runLevel(new Level(plans[level]),
                              Display);//只要玩家死亡，当前的水平就会重新开始。
  if (status == "won") level++;
  else
    console.log("lives：" + (plans.length - level));
}
console.log("You've won!");
}

runGame(GAME_LEVELS, DOMDisplay);