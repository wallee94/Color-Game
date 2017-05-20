var winnerSquare;
var randomRGB = function(){
  var num;
  num = Math.floor(Math.random()*255);
  var R = num < 10 ? "00" + num : num < 100 ? "0" + num : num;
  num = Math.floor(Math.random()*255);
  var G = num < 10 ? "00" + num : num < 100 ? "0" + num : num;
  num = Math.floor(Math.random()*255);
  var B = num < 10 ? "00" + num : num < 100 ? "0" + num : num;
  return {
    R: R,
    G: G,
    B: B
  };
};

var userWins = function(){
  var sq;
  if (this.id === 'sq' + winnerSquare){
    for(var j = 1; j < 7; j++){
      sq = document.querySelector('#sq' + j);
      sq.style.background = this.style.background;
    }
  }
};

var initGame = function(){
  var mainColor = randomRGB(),
      color, square,
      title = document.querySelector('#title-rgb');
  winnerSquare = Math.floor(Math.random()*6) + 1;
  title.textContent = "RGB(" + mainColor.R + ", " + mainColor.G + ", " + mainColor.B + ")";
  for(var j = 1; j < 7; j++){
    color = j === winnerSquare ? mainColor : randomRGB();
    square = document.querySelector('#sq' + j);
    square.style.background = 'rgb(' + color.R + "," + color.G + "," + color.B + ')';
    square.addEventListener("click", userWins, false);
    square.addEventListener("click", userWins);
  }
};

document.querySelector('#reset').addEventListener('click', initGame);
initGame();
