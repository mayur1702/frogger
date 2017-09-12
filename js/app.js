// Enemies our player must avoid
var f = 1;
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};
var Bonus = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/Star.png';

};

var character = function(a, b, c) {
    ctx.drawImage(a, b, c);
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;
    if (this.x > 505)
        this.x = 0;
};
Enemy.prototype.checkcol = function() {
    if (Math.abs(player.x - this.x) < 80 && Math.abs(player.y - this.y) < 50 && lives > 0) {
        alert("Collision!!!!!");
        lives--;
        stats(score, lives);
        player.x = PLAYER_X[Math.floor(Math.random() * PLAYER_X.length)];
        player.y = PLAYER_Y[Math.floor(Math.random() * PLAYER_Y.length)];
    }
    if (player.y < 65) {
        level += 1;
        console.log(score);
        nextLevel(level);
        stats(score, lives);
        player.x = PLAYER_X[Math.floor(Math.random() * PLAYER_X.length)];
        player.y = PLAYER_Y[Math.floor(Math.random() * PLAYER_Y.length)];
    }
    if (lives === 0) {
        reset();
    }
    if (j !== 0)
        checkpos();
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    character(Resources.get(this.sprite), this.x, this.y);
    this.checkcol();
};
// Draw the bonus objects on screen
Bonus.prototype.render = function(f) {
    if (f != 0) {
        character(Resources.get(this.sprite), this.x, this.y);
    }
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, forward) {
    this.x = x;
    this.y = y;
    this.sprite = "images/char-boy.png";
};
Player.prototype.update = function() {
    switch (temp) {
        case 1:
            this.sprite = "images/char-boy.png";
            break;
        case 2:
            this.sprite = "images/char-pink-girl.png";
            break;
        case 3:
            this.sprite = "images/char-horn-girl.png";
            break;
        case 4:
            this.sprite = "images/char-cat-girl.png";
            break;
        case 5:
            this.sprite = "images/char-princess-girl.png";
            break;
    }
};
Player.prototype.render = function() {
    character(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput = function(keyPress) {
    if (keyPress == 'left' && this.x >= 80) {
        this.x -= 101;
    }
    if (keyPress == 'up' && this.y > 10) {
        this.y -= 83;
    }
    if (keyPress == 'right' && this.x < 400) {
        this.x += 101;
    }
    if (keyPress == 'down' && this.y <= 320) {
        this.y += 83;
    }
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
//var character=new Character();
var temp;
var allEnemies = [];
var score = 0;
var POSSIBLE = [65, 140, 220];
var PLAYER_X = [0, 100, 200, 300, 400];
var PLAYER_Y = [320, 400];
var player = new Player(PLAYER_X[Math.floor(Math.random() * PLAYER_X.length)], PLAYER_Y[Math.floor(Math.random() * PLAYER_Y.length)]);
var lives = 3;
var level = 1;
var j = 1;
var enemy = new Enemy(0, POSSIBLE[Math.floor(Math.random() * POSSIBLE.length)], Math.random() * 256);
var bonus = new Bonus(PLAYER_X[Math.floor(Math.random() * PLAYER_X.length)], POSSIBLE[Math.floor(Math.random() * POSSIBLE.length)]);

var reset = function() {
    lives = 3;
    score = 0;
    level = 1;
    nextLevel(0);
    stats(0, 3);
};
// Displaying stats
var stats = function(score, lives) {
    $("#scores").text("Your Score :" + score);
    $("#lives").text("Lives remaining :" + lives);
    $("#level").text("Level: " + level);
};
// Initial stats
stats(0, 3);
// checking collision or level up

var checkpos = function() {
    if (Math.abs(player.x - bonus.x) < 80 && Math.abs(player.y - bonus.y) < 50 && lives > 0) {
        score += 50;
        j = 0;
        f = 0;
        stats(score, lives);
    }
};
allEnemies.push(enemy);
// increase difficulty
var nextLevel = function(strength) {
    // remove all previous enemies on canvas
    allEnemies.length = 0;
    f = 1;
    j = 1;
    bonus.x = PLAYER_X[Math.floor(Math.random() * PLAYER_X.length)];
    bonus.y = POSSIBLE[Math.floor(Math.random() * POSSIBLE.length)];
    // load new set of enemies
    for (var i = 0; i <= strength; i++) {
        var enemy = new Enemy(0, POSSIBLE[Math.floor(Math.random() * POSSIBLE.length)], Math.random() * 256);
        allEnemies.push(enemy);
    }
};
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

document.getElementById('boy').onclick = function() {
    temp = 1;
};
document.getElementById('girl').onclick = function() {
    temp = 2;
};
document.getElementById('horn').onclick = function() {
    temp = 3;
};
document.getElementById('cat').onclick = function() {
    temp = 4;
};
document.getElementById('princess').onclick = function() {
    temp = 5;
};