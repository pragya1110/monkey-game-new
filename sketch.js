//create variables
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running
var banana ,bananaImage, stone, obstacleImage
var FoodGroup, obstacleGroup
var score,survivalTime
var ground


function preload(){
  
  //load pictures
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
createCanvas(400, 400);
  //createGroups
  FoodGroup=createGroup(); 
  obstacleGroup=createGroup();
  
  //createSprites
monkey=createSprite(80,315,10,10);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.09;
  
  ground=createSprite(250,350,1200,5);

  survivalTime=0;
  score=0;
}


function draw() {
  background(255);
  
  //gamestate play
  if(gameState==PLAY){
  ground.velocityX=-7;
    
  //make the monkey jump
    if(keyDown("space")&& monkey.y >= 300) {
        monkey.velocityY = -12;
    }
  
    //illusion
  if(ground.x<0){
    ground.x=ground.width/2;
  }
  
    //count survival time
    survivalTime=Math.ceil(frameCount/frameRate())  
    
    //gravity and stop monkey from falling down 
  monkey.velocityY = monkey.velocityY + 0.5;
  monkey.collide(ground);
    
    //spawn obstacles and food
    obstacle();
    spawnBananas();
    
    // change gamestate
    if(obstacleGroup.isTouching(monkey)){
    gameState=END;
}
    // gamestate end
  }
  else if(gameState==END){
    //change velocities
    ground.velocityX=0;
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    monkey.VelocityX=0;
    
    //stop monkey from falling down
    monkey.collide(ground);
    
    //cahnge lifetimes
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
    
  }
  
  //score
  stroke("white");
  textSize(20);
  fill("white");
  text("score:"+ score,500,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  text("Survival Time:"+ survivalTime,100,50);
  
  drawSprites();
}

// spawn bananas
function spawnBananas(){
   if (frameCount % 80 == 0) {
     banana=createSprite(170,165,10,10);
     banana.addImage(bananaImage);
     banana.scale=0.05;
     
     banana.y=Math.round(random(120,200));
     banana.velocityX=-3;
     banana.lifetime=50;
     
     FoodGroup.add(banana);
   }
}

//spawn obstacles
function obstacle(){
  if (frameCount % 300 == 0){
    stone=createSprite(290,339,10,10);
    stone.addImage(obstacleImage);
    stone.scale=0.07;
    stone.velocityX=-12;
    stone.lifetime=300;
    
    obstacleGroup.add(stone);
  }
}