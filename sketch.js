var tower,towerimage;
var ghost,ghostimage;
var door,doorimage;
var climber,climberimage;
var doorsgroup;
var climbersgroup;
var invisibleclimber,invisibleclimbersgroup;
var gameState = "PLAY";


function preload()
{
 
 towerimage = loadImage("tower.png");
 ghostimage = loadImage("ghost-standing.png");
 doorimage = loadImage("door.png") ;
 climberimage = loadImage("climber.png");
}

function setup()
{

  createCanvas(600,600);
 
  doorsgroup = new Group();
  climbersgroup = new Group();
  invisibleclimbersgroup = new Group();
  
  tower = createSprite(305,550);
  tower.addImage(towerimage);
  tower.velocityY = 2
  
  ghost = createSprite(300,500,50,50);
  ghost.addImage(ghostimage);
  ghost.scale = 0.4;
  
  
}

function draw()
{
  background("black");
  console.log(tower.y)
  
  if(gameState === "PLAY"){
     if(tower.y>580)
    {
      tower.y = 500;
    }
    
    if(keyDown("space"))
    {
      ghost.velocityY = -5;
    }
  
  if(keyWentDown("left"))
    {
      ghost.velocityX = -5;
    }
  
   if(keyWentDown("right"))
    {
      ghost.velocityX = 5;
    }
  
   
  ghost.velocityY = ghost.velocityY + 0.5;   
  
  
 if(ghost.isTouching(climbersgroup))
 {
   ghost.velocityY = 0;
   ghost.velocityX = 0;
 }
  
  if(ghost.y>600||invisibleclimbersgroup.isTouching(ghost)){
    doorsgroup.destroyEach();
   climbersgroup.destroyEach();
    invisibleclimbersgroup.destroyEach();
    ghost.destroy();
    gameState = "END";
    
  }
  
  
    spawndoors();
  drawSprites();
  }
 if (gameState === "END"){
    fill("white") 
   textSize(25)
    text("Gameover",250,300);
  } 
} 


function spawndoors()
{
  if(frameCount%150 === 0){
  door = createSprite(130,100);
  door.addImage(doorimage);
  door.velocityY = 2;
  door.x  = Math.round(random(130,400))
  door.lifetime = 300;
  doorsgroup.add(door);  
    
  climber = createSprite(180,150);
  climber.addImage(climberimage);
  climber.velocityY = 2;
  climber.x = door.x;
  climber.lifetime = 300;
  climbersgroup.add(climber);
    
  ghost.depth = door.depth;
  ghost.depth = climber.depth;  
  ghost.depth += 1;
    
  invisibleclimber = createSprite(185,160);
  invisibleclimber.width = climber.width;  
  invisibleclimber.height = 20; 
  invisibleclimber.velocityY = 2;
  invisibleclimber.x = door.x;
  invisibleclimber.lifetime = 300;  
  invisibleclimber.visible = false;
  invisibleclimbersgroup.add(invisibleclimber);
  
  }
}
