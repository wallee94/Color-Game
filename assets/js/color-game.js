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
  var lim = isEasy ? 4 : 7,
      sq;
  if (this.id === 'sq' + winnerSquare){
    for(var j = 1; j < lim; j++){
      sq = document.querySelector('#sq' + j);
      sq.style.background = this.style.background;
    }
  }
};

var getRGBFromLevel = function(mainColor){
  if (isEasy){
    return randomRGB();
  }
  else {
    var color = {},
        init = 60,
        range = 40,
        sign;
    for (key in mainColor){
      sign = Math.floor(-1.5 + Math.random()) + 2;
      color[key] = +mainColor[key] + sign*Math.floor(Math.random()*range + init);
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
  lim = isEasy ? 3 : 6
  winnerSquare = Math.floor(Math.random()*lim) + 1;
  title.textContent = "RGB(" + mainColor.R + ", " + mainColor.G + ", " + mainColor.B + ")";
  for(var j = 1; j < 7; j++){
    color = j === winnerSquare ? mainColor : getRGBFromLevel(mainColor);
    square = document.querySelector('#sq' + j);
    square.style.cursor = 'pointer';
    if (isEasy && j > 3){
      square.style.background = '#000';
      square.style.cursor = 'default';
      continue;
    }
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
  if (isEasy){
    return;
  }
  isEasy = true;
  initGame();
});
hardButton = document.querySelector('#hard');
hardButton.style.cursor = 'pointer';
hardButton.addEventListener('click', function(){
  if (!isEasy){
    return;
  }
  isEasy = false;
  initGame();
});

initGame();
