var END=0;
var PLAY=1
var gameState;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score = 0;
var ground,groundImage;
var gameover,gameoverImage;
var reset,resetImage;
var bg,back;

function preload(){
  
  
  monkey_running =loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
 gameoverImage = loadImage("gameOver.png")
  resetImage = loadImage("restart.png")
  
  back = loadImage("back.png")
}



function setup() {
createCanvas(600,600)  
  
  
  monkey=createSprite(50,580,20,50)
  monkey.addAnimation("running",monkey_running);
 monkey.scale=0.1;
  
  ground = createSprite(0,590,1200,10);
ground.visible=true;
  ground.velocityX=-4
  obstacleGroup = new Group();
  bananaGroup = new Group();
  
}


function draw() {
background("magenta")
  //move this command here because when its down the collision is not being detected
    monkey.collide(ground)
  // place the text command here
 textSize(20);
fill(255);
text("Score: "+ score, 500,40); 
  
   if(ground.x<0) {
    ground.x=ground.width/2;
  }
  
  if(keyDown("space")){
    gameState=PLAY
  }
  
  if(gameState===PLAY){
    
    if(bananaGroup.isTouching(monkey)){
      bananaGroup[0].destroy();
      score=score+1  
    }
     if(keyDown("space")&& monkey.y >= 160) {
      monkey.velocityY = -12
         }
    monkey.velocityY= monkey.velocityY+0.5 
//console.log(monkey.y)

  //obstacleGroup.collide(ground)
  
if(frameCount % 100 === 0) {
   obstacle=createSprite(500,565,10,50)
    obstacle.addImage(obstacleImage)
  obstacle.scale=0.1
  obstacle.velocityX=-4
  obstacle.lifeTime=150
  obstacleGroup.add(obstacle)

}
    
    
 spawnbanana();
  }
  if(obstacleGroup.isTouching(monkey)){
    gameState=END;
  }
if(gameState===END){
  gameover = createSprite(300,200,200,200);
  gameover.addImage(gameoverImage);
  
//  reset = createSprite(300,300,200,200);
  //reset.addImage(resetImage);

  obstacleGroup.velocityX=0;
  bananaGroup.velocityX=0;
   
 bg = createSprite(300,300,20,20)
  bg.addImage(back)
}  
 
  

 
  drawSprites();
}
function spawnbanana() {
  //write code here to spawn the clouds
  if (frameCount % 200 === 0) {
    var banana = createSprite(600,420,40,10);
    banana.y = Math.round(random(320,420));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each cloud to the group
    bananaGroup.add(banana);
  }
  
}

function spawnreset(){
  gameState = PLAY;
  gameover.visible = false;
  reset.visible = false;
  
  obstacleGroup.destroyEach();
  bananaGroup.destroyEach();
  
  
  if(localStorage["HighestScore"]<score){
    localStorage["HighestScore"] = score;
  }
  
  score = 0;
  
}
