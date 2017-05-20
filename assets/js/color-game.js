var isEasy = true,
    winnerSquare, resetButton, easyButton, hardButton;
    
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

var getRGBFromLevel = function(mainColor){
  var color = randomRGB();
  if (isEasy){
    return color;
  }
  else {
    var diff = {
      R: mainColor.R - color.R,
      G: mainColor.G - color.G,
      B: mainColor.B - color.B
    };
    while(Math.sqrt( diff.R*diff.R + diff.G*diff.G + diff.B*diff.B ) > 100){
      color = randomRGB();
      diff = {
        R: mainColor.R - color.R,
        G: mainColor.G - color.G,
        B: mainColor.B - color.B
      };
    }
    return color;
  }
};

var initGame = function(){
  var mainColor = randomRGB(),
      color, square,
      title = document.querySelector('#title-rgb');
  if (isEasy){
    easyButton.style.fontWeight = 'bold';
    hardButton.style.fontWeight = 'normal';
  }
  else {
    easyButton.style.fontWeight = 'normal';
    hardButton.style.fontWeight = 'bold';
  }
  winnerSquare = Math.floor(Math.random()*6) + 1;
  title.textContent = "RGB(" + mainColor.R + ", " + mainColor.G + ", " + mainColor.B + ")";
  for(var j = 1; j < 7; j++){
    color = j === winnerSquare ? mainColor : getRGBFromLevel(mainColor);
    square = document.querySelector('#sq' + j);
    square.style.background = 'rgb(' + color.R + "," + color.G + "," + color.B + ')';
    square.addEventListener("click", userWins, false);
    square.addEventListener("click", userWins);
  }
};

resetButton = document.querySelector('#reset');
resetButton.style.cursor = 'pointer';
resetButton.addEventListener('click', initGame);
easyButton = document.querySelector('#easy');
easyButton.style.cursor = 'pointer';
easyButton.addEventListener('click', function(){
  isEasy = true;
  initGame();
});
hardButton = document.querySelector('#hard');
hardButton.style.cursor = 'pointer';
hardButton.addEventListener('click', function(){
  isEasy = false;
  initGame();
});

initGame();
