// Enemies our player must avoid

var Enemy = function(x,y,s) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = s;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x > 505){
      //If x position is outside the board, then reset position to the start and assign a new random speed
      this.x = -100;
      this.speed = (Math.random()* (300 - 60) + 60);
    }

    //check collisions
    const XRightRange = this.x + 70;
    const XLeftRange = this.x - 70;
    const YUpRange = this.y - 60;
    const YDownRange = this.y + 60;

    if (player.x >= XLeftRange && player.x <= XRightRange && player.y >= YUpRange && player.y <= YDownRange){
      player.resetPosition();
      player.score = 0;
      player.setScore();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(){
  this.sprite = 'images/char-boy.png';
  this.x = 200;
  this.y = 400;
  this.score = 0;
  this.setScore();
}

Player.prototype.update = function(dt){

}

Player.prototype.render = function(){
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.resetPosition = function(){
  this.x = 200;
  this.y = 400;
}

Player.prototype.setScore = function(){
  document.getElementById("player-score").innerHTML = "Score: " + this.score;
}

Player.prototype.handleInput = function(direction){
  switch (direction) {
    case 'right':
      this.x = (this.x + 100) == 500 ? this.x = this.x : this.x += 100;
      break;
    case 'left':
      this.x = (this.x - 100) < 0 ? this.x = this.x : this.x -= 100;
      break;
    case 'up':
      this.y -= 85;
      if (this.y <= 50) {
        this.y = 1;
        this.score++;
        this.setScore();
        this.resetPosition();
      }
      break;
    case 'down':
      this.y = this.y = (this.y + 85) > 400 ? this.y = this.y : this.y += 85;;
      break;
    default:

  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let enemy1 = new Enemy(-100,60,(Math.random()* (300 - 60) + 60));
let enemy2 = new Enemy(-100,140,(Math.random()* (300 - 60) + 60));
let enemy3 = new Enemy(-100,230,(Math.random()* (300 - 60) + 60));
let allEnemies = [enemy1, enemy2, enemy3];
let player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
