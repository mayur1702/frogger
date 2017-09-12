// Enemies our player must avoid
var f=1;
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x=x;
    this.y=y;
    this.speed=speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};
var Bonus=function(x,y){
    this.x=x;
    this.y=y;
    this.sprite='images/Star.png';

}
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x=this.x+this.speed*dt;
    if(this.x>505)
        this.x=0;
    checkcol(this);
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Draw the bonus objects on screen
Bonus.prototype.render=function(f){
    if(f!=0)
    {
       ctx.drawImage(Resources.get(this.sprite), this.x,this.y);
   }
}
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y){
    this.x=x;
    this.y=y;
    this.sprite="images/char-boy.png";
};
Player.prototype.update=function(){
$("#boy").click(function(){
     player.sprite=  "images/char-boy.png"});
$("#girl").click(function(){
     player.sprite=  "images/char-pink-girl.png"});
$("#horn").click(function(){
     player.sprite=  "images/char-horn-girl.png"});
$("#cat").click(function(){
     player.sprite=  "images/char-cat-girl.png"});
$("#princess").click(function(){
     player.sprite=  "images/char-princess-girl.png"});
};
Player.prototype.render=function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
 };
 Player.prototype.handleInput=function(keyPress){
    if (keyPress == 'left'&& player.x>=100) {
        player.x -= 100;
    }
    if (keyPress == 'up'&& player.y>10) {
        player.y -= 82;
    }
    if (keyPress == 'right'&& player.x<400) {
        player.x += 100;
    }
    if (keyPress == 'down'&& player.y<=320) {
        player.y += 82;
    }
 }
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies=[];
var score=0;
var possible=[65,140,220];
var playerPossibleX=[0,100,200,300,400];
var playerPossibleY=[320,400];
var player=new Player(playerPossibleX[Math.floor(Math.random() * playerPossibleX.length)],playerPossibleY[Math.floor(Math.random() * playerPossibleY.length)]);
var lives=3;
var level=1;
var j=1;
var enemy = new Enemy(0,possible[Math.floor(Math.random() * possible.length)],Math.random() * 256);
var bonus= new Bonus(playerPossibleX[Math.floor(Math.random() * playerPossibleX.length)],possible[Math.floor(Math.random() * possible.length)]);

var reset=function(){
    lives=3;
    score=0;
    level=1;
    nextLevel(0);
    stats(0,3);
}
// Displaying stats
var stats=function(score,lives){
    $("#scores").text("Your Score :"+score);
    $("#lives").text("Lives remaining :" +lives);
    $("#level").text("Level: "+level);
}
// Initial stats
stats(0,3);
// checking collision or level up
var checkcol=function(ene){
    if(Math.abs(player.x-ene.x)<80 && Math.abs(player.y-ene.y)<50 && lives>0){
        alert("Collision!!!!!");
        lives--;
            stats(score,lives);    
        player.x=playerPossibleX[Math.floor(Math.random() * playerPossibleX.length)];
        player.y=playerPossibleY[Math.floor(Math.random() * playerPossibleY.length)];
}
    if(player.y<65){
        level+=1;
        console.log(score);
        nextLevel(level);
        stats(score,lives);
        player.x=playerPossibleX[Math.floor(Math.random() * playerPossibleX.length)];
        player.y=playerPossibleY[Math.floor(Math.random() * playerPossibleY.length)];
    }
    if(lives===0){
          reset();    
    }
    if(j!==0)
    checkpos();    

}

var checkpos=function(){
     if(Math.abs(player.x-bonus.x)<80 && Math.abs(player.y-bonus.y)<50 && lives>0){
       score+=50;
       j=0;
       f=0;
       stats(score,lives);    
    }
}
allEnemies.push(enemy);
// increase difficulty
var nextLevel = function(strength) {
    // remove all previous enemies on canvas
    allEnemies.length = 0;
    f=1;
    j=1;
    bonus.x=playerPossibleX[Math.floor(Math.random() * playerPossibleX.length)];
        bonus.y=possible[Math.floor(Math.random() * possible.length)];
    // load new set of enemies
    for (var i = 0; i <= strength; i++) {
        var enemy = new Enemy(0,possible[Math.floor(Math.random() * possible.length)], Math.random() * 256);
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
