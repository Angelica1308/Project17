var towerImage,tower
var doorImage,door,doorsGroup
var ghostImage,ghost
var climberImage,climber,climbersgroup
var gameState="playing"
var spookySound
function preload(){
  towerImage=loadImage("tower.png")
  doorImage=loadImage("door.png")
  ghostImage=loadImage("ghost-standing.png")
  climberImage=loadImage("climber.png")
  spookySound=loadSound("spooky.wav")
}
function setup(){
  createCanvas(600,600)
  tower=createSprite(300,300)
  tower.addImage(towerImage)
  tower.velocityY=1
  
  ghost=createSprite(200,200)
  ghost.addImage(ghostImage)
  ghost.scale=0.3
  
  doorsGroup= new Group();
  climbersGroup= new Group();
}
function draw(){
  if(gameState==="playing"){
    if(keyDown("left")){
      ghost.x=ghost.x-3
    }
    if(keyDown("right")){
      ghost.x=ghost.x+3
    }
    if(keyDown("space")){
      ghost.velocityY=-10
    }
    ghost.velocityY=ghost.velocityY+0.8
    if(tower.y>400){
      tower.y=300
    }
    spawnDoors();
    if(climbersGroup.isTouching(ghost)){
      gameState="end"
    }
   
  }
  drawSprites()
   if (gameState==="end"){
      ghost.velocityY=0
      tower.velocityY=0
      ghost.destroy();
      textSize(30);
     fill("yellow")
      text("GameOver",230,250)
    }
}
function spawnDoors(){
  if(frameCount%240===0){
    door=createSprite(200,-50)
    climber=createSprite(200,50)
   
    door.x=Math.round(random(120,400))
    climber.x=door.x
     door.addImage(doorImage)
    climber.addImage(climberImage)
    door.velocityY=1
    climber.velocityY=1
    door.lifetime=800
    climber.lifetime=800
    ghost.depth=door.depth +1
    doorsGroup.add(door)
    climbersGroup.add(climber)
  }
}