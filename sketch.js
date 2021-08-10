var elsa,elsaIm,snow,snowIm,snowG,fire,fireIm,fireG,icebar,icebarIm,icebarG;
var ice,iceIm,ice2;
var obs,obsIm,rock,rockIm,rockG,obsG,gm,gmIm;
var gaint,gaintIm,gameState="play"
var invisibleGround,invisibleGround2,edges
var score=0
var mosterSound
var point ;
var lose;
var scoreSnow

function preload(){
    iceIm=loadImage("images/bg.png");
elsaIm=loadAnimation("images/elsaR.png","images/elsaR2.png","images/elsaR3.png");
gaintIm=loadAnimation("images/snowgaint.png");
snowIm=loadImage("images/symbol.png");
fireIm=loadImage("images/fire.png");
icebarIm=loadImage("images/ice bar.png");
obsIm=loadImage("images/obs.png");
rockIm=loadImage("images/rock.png");
gmIm=loadImage("images/gm.jpg");

mosterSound = loadSound("sound/mon.wav");
point= loadSound("sound/point.wav");
lose= loadSound("sound/end.wav");
}
function setup(){
  
  elsa=createSprite(600,500);
  elsa.addAnimation("run",elsaIm);
  elsa.scale=0.6

  gaint=createSprite(250,500);
  gaint.addAnimation("fight",gaintIm);
  gaint.scale=0.5

  scoreSnow=createSprite(35,35);
  scoreSnow.addImage("wow",snowIm);
  scoreSnow.scale=0.1


  gm=createSprite(700,300);
 gm.addImage("gameover",gmIm);
  
 
//  top invisibleGround
invisibleGround=createSprite(windowWidth/2,10,windowWidth,10)
invisibleGround.visible=false
invisibleGround2=createSprite(windowWidth/2,windowHeight-10,windowWidth,10)
invisibleGround2.visible=false
//edges=createEdgeSprites();
fireG= new Group();
rockG= new Group();
obsG= new Group();
snowG= new Group();


}
function draw(){
  createCanvas(windowWidth,windowHeight); 
  background(iceIm);
//mosterSound.play();
  fill("grey")
  textSize(20);
  text("Score = "+score,70,50);
 // mosterSound.play();
  if(gameState=="play"){
    
    gm.visible=false;
    

  elsa.y=World.mouseY;
  gaint.y=elsa.y;
  gaint.collide(invisibleGround);
  gaint.collide(invisibleGround2);

  gaint.setCollider("circle",40,0,400);
 
  elsa.collide(invisibleGround);
  
  elsa.collide(invisibleGround2);
  if (World.frameCount % 80 == 0){
    mosterSound.play();
  }
 


 //elsa.collide(edges[2]);
 


 var select_oppPlayer = Math.round(random(1,4));
  
 if (World.frameCount % 100 == 0) {
  
   if (select_oppPlayer == 1) {
     fires();
     fireG.add(fire)
   } else if (select_oppPlayer == 2) {
     rocks();
     rockG.add(rock);
   } else if (select_oppPlayer ==3) {
     obss();
     obsG.add(obs);
   } else {
     snows();
     snowG.add(snow);
   }
 }

 if (snowG.isTouching(elsa)){
   snow.destroy();
   point.play();
   score=score+200
   console.log(score)
  
 }




 if(fireG.isTouching(elsa)||rockG.isTouching(elsa)||obsG.isTouching(elsa)){
  lose.play();
  //elsa.destroy();
  gameState="end" 
  
  //rockG.velocityX = -(4 + 3* score/100)
  
  
 }
  }else if(gameState=="end"){

   
    
 gm.visible=true;

 
 fill("grey")
 textSize(50);
text("PRESS SPACE TO RESTART",400,650)


 } 
 //reset();
 










  drawSprites();
}

function fires(){
  fire=createSprite(1400,Math.round(random(200,660)));
      fire.addImage("heat",fireIm);
      fire.velocityX=-10
      //fire.debug=true
      fire.setCollider("circle",0,0,40);
      fire.lifetime=150
  //fire.debug = true
  
}

function rocks(){
  rock=createSprite(1400,Math.round(random(200,660)));
     rock.addImage("falling",rockIm);
     rock.velocityX=-10
     rock.scale=0.1
    rock.lifetime=150
     //rock.debug=true
     
}

function obss(){
  obs=createSprite(1400,Math.round(random(400,660)));
     obs.addImage("fall",obsIm);
     obs.scale=0.7
     obs.lifetime=150
     obs.velocityX=-10
}

function snows (){
  snow=createSprite(1400,Math.round(random(30, 660)));
  snow.addImage("light",snowIm);
  snow.velocityX=-15
  snow.lifetime=150 
     snow.scale=0.1
}

function reset(){
  
 
  if(keyCode==32) {
    
    gm.visible=false
  text.visible=false
    gameState="play"
    console.log(reset)
    score=0
  }
}

function keyPressed(){
  reset();
}

