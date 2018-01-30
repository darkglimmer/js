//2.1
for (var line = "#"; line.length <= 7; line += "#")
  console.log(line);
//2.2
for (var number = 1; number <= 100; number++) { 
    if (number % 3 == 0 && number % 5 == 0) {
      console.log("FizzBuzz");
    } 
    else if(number % 3 == 0 && number % 5 != 0) {
      console.log("Fizz");
    }
    else if(number % 3 != 0 && number % 5 == 0) {
      console.log("Buzz");
    }
    else {
      console.log(number);
    }
  }
//2.3 
var size=8;
for(var number=1;number<=size;number++){
  if(number%2==1){
    var result="#";
    for(var line=2;line<=size;line++){
      if(line%2==1){
        result+="#";
      }
      else{
        result+=" ";
      }
    }
    console.log(result);
  }
  else{
    var result=" ";
    for(var line=2;line<=size+1;line++){
      if(line%2==1){
        result+="#";
      }
      else{
        result+=" ";
      }
    }
    console.log(result);
  }
}

//2.3简便
var size = 8;

var board = "";

for (var y = 0; y < size; y++) {
  for (var x = 0; x < size; x++) {
    if ((x + y) % 2 == 0)
      board += " ";
    else
      board += "#";
  }
  board += "\n";
}

console.log(board);
   
