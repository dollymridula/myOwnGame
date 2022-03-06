var bg,bgImg;
var spiderMan, spiderManImg;
var man1,man2,man3,man1Img,man2Img,man3Img;
var spidermanShooterImg,spidermanShooter;
var zombiasGroup,zombia1Img,zombia2Img,zombia3Img,zombia4Img,zombia5Img;
var PLAY = 1;
var END = 0;
var gameState = PLAY ;

function preload(){
  
  spiderManImg = loadImage("assets/spider.png");
  spidermanShooterImg = loadImage("assets/spidermanShooter2.png");

  bgImg = loadImage("assets/building.jpg");
  man1Img = loadImage("assets/man1.png");
  man2Img = loadImage("assets/man2.png");
  man3Img = loadImage("assets/man3.png");
  zombia1Img = loadImage("assets/zombia1.png");
  zombia2Img = loadImage("assets/zombia2.png");
  zombia3Img = loadImage("assets/zombia3.png");
  zombia4Img = loadImage("assets/zombia4.png");
  zombia5Img = loadImage("assets/zombia5.png");


}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20);
  bg.addImage(bgImg);
  bg.scale = 1.1
  

//creating the player sprite
  spiderMan = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
  spiderMan.addImage(spiderManImg)
  spiderMan.scale = 0.3
  spiderMan.debug = true
  spiderMan.setCollider("rectangle",0,0,300,300)

  man1 = createSprite(displayWidth-900, displayHeight-300, 50, 50);
  man1.addImage(man1Img)
  man1.scale = 0.6
  man1.debug = true
  man1.setCollider("rectangle",0,0,300,300)

  man2 = createSprite(displayWidth-600, displayHeight-300, 50, 50);
  man2.addImage(man2Img)
  man2.scale = 0.6
  man2.debug = true
  man2.setCollider("rectangle",0,0,300,300)

 zombiasGroup = createGroup();

}


function draw() {
  background(0); 

  if(gameState === PLAY){

    //moving the player up and down and making the game mobile compatible using touches
    if(keyDown("UP_ARROW")||touches.length>0){
      spiderMan.y = spiderMan.y-30
    }
    
    if(keyDown("DOWN_ARROW")||touches.length>0){
      spiderMan.y = spiderMan.y+30
    }
    //release bullets and change the image of shooter to shooting position when space is pressed
    if(keyWentDown("space")){ 
      spiderMan.addImage(spidermanShooterImg); 
 
    }
    //player goes back to original standing image once we stop pressing the space bar
    else if(keyWentUp("space")){
      spiderMan.addImage(spiderManImg)
    }

    
    if(zombiasGroup.isTouching(spiderMan)){
      gameState = END;
    }

     //spawn zombia on the ground
    spawnZombia();

  }
  else{

    //set lifetime of the game objects so that they are never destroyed
    zombiasGroup.setLifetimeEach(-1);

    textSize(30);
    text("Game Over")

  }

    drawSprites();

}  

function spawnZombia(){
  if (frameCount % 60 === 0){
    var zombia = createSprite(Math.round(random(50,windowWidth -50)),Math.round(random(50,windowHeight -50)),10,40);
    zombia.velocityX = Math.round(random(-2,2))
    
     //generate random obstacles
     var rand = Math.round(random(1,5));
     switch(rand) {
       case 1: zombia.addImage(zombia1Img);
               zombia.scale = 0.4;
               break;
       case 2:zombia.addImage(zombia2Img);
               zombia.scale = 0.5;
               break;
       case 3: zombia.addImage(zombia3Img);
               zombia.scale = 0.5;
               break;
       case 4: zombia.addImage(zombia4Img);
               zombia.scale = 0.4;
               break;
       case 5: zombia.addImage(zombia5Img);
               zombia.scale = 0.1;
               break;
       default: break;
     }
    
     //assign lifetime to the zombia           
    
     zombia.lifetime = 300;
    
    //add each zombia to the group
    zombiasGroup.add(zombia);
  }
 }