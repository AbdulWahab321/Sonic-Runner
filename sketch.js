var sonic
var background1,ground
var coinNum=0
 function preload(){

  sonicAnimation=loadAnimation("S1.png","S2.png","S3.png","S4.png","S5.png","S6.png","S7.png","S8.png")
  bg=loadImage("bgForRunGame.png")
  ringImg=loadImage("SR.png")
  EnemyImg=loadImage("Enemy.png")

}
function setup(){
  canvas = createCanvas(900, 500);

  background1 = createSprite(600, 250, 1000, 50);
  background1.addImage(bg);
  background1.scale = 1.8
  background1.x = 600
  background1.y = 150
  
  ground=createSprite(100,395,1500,20)
  ground.visible=false
  sonic=createSprite(50,360,20,20)
  sonicAnimation.frameDelay=20
  sonic.addAnimation("SonicRunning",sonicAnimation)
  sonic.scale=0.8
  CoinGR=new Group();
  EnemyGr=new Group();
  !function () { "use strict"; var t = function (t) { this.init(t) }; t.prototype = { constructor: t, init: function (t) { "string" == typeof t && (t = document.querySelector(t)), this._fps = 0, this._frames = 0, this._startTime = Date.now(), this._element = this._createElement("div", "position:fixed;top:0;left:0;z-index:9999;background-color:#eee;display:inline;margin:1px;padding:4px;border:1px solid #888;font-family:arial,sans-serif;font-size:9px;color:#333", t || document.body) }, getElement: function () { return this._element }, getFPS: function () { return this._fps }, start: function () { this._animationFrameId || this._loop() }, stop: function () { this._animationFrameId && (window.cancelAnimationFrame(this._animationFrameId), this._animationFrameId = null) }, step: function () { this._frames++; var t = Date.now(), i = t - this._startTime; i >= 1e3 && (this._fps = Math.round(1e3 * this._frames / i), this._frames = 0, this._startTime = t, this._updateDisplay()) }, _loop: function () { this.step(), this._animationFrameId = window.requestAnimationFrame(this._loop.bind(this)) }, _updateDisplay: function () { this._element.innerHTML = "<b>" + this._fps + "</b> fps" }, _createElement: function (t, i, e) { var n = document.createElement(t); if (n) return i && (n.style.cssText = i), e && e.appendChild(n), n } }, window.FPS = t }();
  fps = new FPS("#container");

  fps.start();

  greeting();
}
function draw(){
  background("pink")
  if(frameCount%150===0){
     spawnCoins()
  }
  if(frameCount%100===0){
    spawnEnemy()
  }
  if(sonic.isTouching(CoinGR)){
     coinNum+=1
     CoinGR.destroyEach();
  }
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
  
  if(keyDown("space")){
    sonic.velocityY=-12
  }
  if(sonic.y<180){
    sonic.velocityY=12
  }

  sonic.collide(ground)
  drawSprites();
  textSize(25)
  fill("white")
  text("Coin Collected:"+coinNum,50,50)
}
function greeting(){
    sp=new SpeechSynthesisUtterance();
    sp.text="Hai Welcome To Sonic The Hedgehog game"
    sp.rate=0.9
    window.speechSynthesis.speak(sp)
}
function spawnCoins() {
  coi = createSprite(1100,280, 50, 50)
  coi.addImage(ringImg);
  coi.scale = 0.030
  coi.velocityX = -7

  CoinGR.add(coi)

}
function spawnEnemy() {
  enemy = createSprite(1100,320, 50, 50)
  enemy.addImage(EnemyImg);
  enemy.scale = 0.2
  enemy.velocityX = -7

  EnemyGr.add(enemy)

}