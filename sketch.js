var sonic
var background1
 function preload(){

  sonicAnimation=loadAnimation("S1.png","S2.png","S3.png","S4.png","S5.png","S6.png","S7.png","S8.png")
  bg=loadImage("bgForRunGame.png")


}
function setup(){
  canvas = createCanvas(900, 500);

  background1 = createSprite(600, 250, 1000, 50);
  background1.addImage(bg);
  background1.scale = 1.8
  background1.x = 600
  background1.y = 150
  

  sonic=createSprite(50,360,20,20)
  sonicAnimation.frameDelay=20
  sonic.addAnimation("SonicRunning",sonicAnimation)
  sonic.scale=0.7
  
  greeting();
}
function draw(){
  background("pink")

  if(keyDown("right")){
    if(frameCount%50===0){
      background1.velocityX += -10
      sonicAnimation.frameDelay=1
      sonic.addAnimation("SonicRunning",sonicAnimation)
      
    }
   
    }
    else{
      if(frameCount%100===0){
        background1.velocityX-=10
      }
      if(background1.velocityX < 1 || background1.velocityX === 0) {
        background1.velocityX =0;
        sonicAnimation.frameDelay=4
        sonic.addAnimation("SonicRunning",sonicAnimation)
      }

    
  }
  

 

  

  if (background1.x < -10) {
    background1.x = background1.width/2

  }


 
  drawSprites();
  textSize(50)
  text("Speed:"+background1.velocityX,100,200)
}
function greeting(){
    sp=new SpeechSynthesisUtterance();
    sp.text="Hai Welcome To Sonic The Hedgehog game"
    sp.rate=0.9
    window.speechSynthesis.speak(sp)
}
