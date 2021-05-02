var sonic;
var background1, ground;
var coinNum = 0;
var PLAY = 1;
var END = 2;
var gameState;
var powerS;
var got_power = false;
var power_count_down = 10;
var SELECTOR = 3;
var music1,music2,music3,darks,fa,bgmpSP,SPectreNcs,on,nomusic
function preload() {
  sonicAnimation = loadAnimation(
    "S1.png",
    "S2.png",
    "S3.png",
    "S4.png",
    "S5.png",
    "S6.png",
    "S7.png",
    "S8.png"
  );
  bg = loadImage("bgForRunGame.png");
  ringImg = loadImage("SR.png");
  EnemyImg = loadImage("Enemy.png");
  power = loadImage("elec.png");
  song = loadSound("MP3/sonicastronomia.mp3");
  spec = loadSound("MP3/spectre.mp3");
  alo = loadSound("MP3/alone.mp3");
  dar = loadSound("MP3/dark.mp3");
  fad = loadSound("MP3/fade.mp3");
  onmy = loadSound("MP3/onMyWay.mp3");
  Her = loadSound("MP3/Her.mp3");
  SpeNcs = loadSound("MP3/ncs.mp3");
}
function setup() {
  canvas = createCanvas(900, 500);
  gameState = SELECTOR;
  background1 = createSprite(600, 250, 1000, 50);
  background1.addImage(bg);
  background1.scale = 1.8;
  background1.x = 600;
  background1.y = 150;


  music1 = createButton("Astronomia-Sonic Remix");
  music1.position(25,300);
  music1.size(200, 40);
  
  music2 = createButton("Spectre");
  music2.position(230, 300);
  music2.size(200, 40);
  
  music3 = createButton("Alone");
  music3.position(435, 300);
  music3.size(200, 40);

  darks = createButton("Darkside");
  darks.position(25, 350);
  darks.size(200, 40);

  fa = createButton("Faded");
  fa.position(640, 300);
  fa.size(200, 40);

  bgmpSP = createButton("Heroes Tonight");
  bgmpSP.position(440,235);
  bgmpSP.size(400,50);
  
  SPectreNcs = createButton("Spectre Ncs Remix");
  SPectreNcs.position(25, 235)
  SPectreNcs.size(400, 50)

  on = createButton("On My Way");
  on.position(435,350)
  on.size(405, 40)

  nomusic = createButton("No Music");
  nomusic.position(230, 350)
  nomusic.size( 200, 40)

  hideAll();

  ground = createSprite(100, 395, 1500, 20);
  ground.visible = false;
  sonic = createSprite(50, 360, 20, 20);
  sonicAnimation.frameDelay = 20;
  sonic.addAnimation("SonicRunning", sonicAnimation);
  sonic.scale = 0.8;
  CoinGR = new Group();
  EnemyGr = new Group();
  powerGr = new Group();
  !(function () {
    "use strict";
    var t = function (t) {
      this.init(t);
    };
    (t.prototype = {
      constructor: t,
      init: function (t) {
        "string" == typeof t && (t = document.querySelector(t)),
          (this._fps = 0),
          (this._frames = 0),
          (this._startTime = Date.now()),
          (this._element = this._createElement(
            "div",
            "position:fixed;top:0;left:0;z-index:9999;background-color:#eee;display:inline;margin:1px;padding:4px;border:1px solid #888;font-family:arial,sans-serif;font-size:9px;color:#333",
            t || document.body
          ));
      },
      getElement: function () {
        return this._element;
      },
      getFPS: function () {
        return this._fps;
      },
      start: function () {
        this._animationFrameId || this._loop();
      },
      stop: function () {
        this._animationFrameId &&
          (window.cancelAnimationFrame(this._animationFrameId),
          (this._animationFrameId = null));
      },
      step: function () {
        this._frames++;
        var t = Date.now(),
          i = t - this._startTime;
        i >= 1e3 &&
          ((this._fps = Math.round((1e3 * this._frames) / i)),
          (this._frames = 0),
          (this._startTime = t),
          this._updateDisplay());
      },
      _loop: function () {
        this.step(),
          (this._animationFrameId = window.requestAnimationFrame(
            this._loop.bind(this)
          ));
      },
      _updateDisplay: function () {
        this._element.innerHTML = "<b>" + this._fps + "</b> fps";
      },
      _createElement: function (t, i, e) {
        var n = document.createElement(t);
        if (n) return i && (n.style.cssText = i), e && e.appendChild(n), n;
      },
    }),
      (window.FPS = t);
  })();
  fps = new FPS("#container");

  fps.start();

  greeting();
}
function draw() {

  background("pink");
  if (gameState === 1) {
    hideAll()

    sonic.visible = true;
    if (frameCount % 150 === 0) {
      spawnCoins();
    }
    if (frameCount % 100 === 0) {
      spawnEnemy();
    }
    if (sonic.isTouching(CoinGR)) {
      coinNum += 1;
      CoinGR.destroyEach();
    }
    if (keyDown("right")) {
      if (frameCount % 50 === 0) {
        background1.velocityX += -10;
        sonicAnimation.frameDelay = 1;
        sonic.addAnimation("SonicRunning", sonicAnimation);
      }
    } else {
      if (frameCount % 100 === 0) {
        background1.velocityX -= 10;
      }
      if (background1.velocityX < 1 || background1.velocityX === 0) {
        background1.velocityX = 0;
        sonicAnimation.frameDelay = 4;
        sonic.addAnimation("SonicRunning", sonicAnimation);
      }
    }

    if (background1.x < -10) {
      background1.x = background1.width / 2;
    }

    if (frameCount % 300 === 0) {
      spawnPower();
    }

    if (sonic.isTouching(powerGr)) {
      got_power = true;
    }
    if (got_power === true) {
      if (frameCount % 25 === 0) {
        power_count_down -= 1;
        sonic.scale = 1.6;
      }
      if (sonic.isTouching(EnemyGr)) {
        EnemyGr.destroyEach();
      }
    } else {
      power_count_down = 10;
      sonic.scale = 0.8;
      if (gameState !== END) {
        if (sonic.isTouching(EnemyGr)) {
          gameState = 2;
        }
      }
    }

    if (power_count_down === 0) {
      got_power = false;
    }

    if (sonic.y < 180) {
      sonic.velocityY = 12;
    } else {
      if (sonic.y < 250) {
      } else {
        if (keyDown("space") || keyDown("up")) {
          sonic.velocityY = -12;
        } else {
          sonic.velocityY = 12;
        }
      }
    }
  }
  sonic.collide(ground);
  drawSprites();
  textSize(50);

  if (gameState === SELECTOR) {

    showAll();
    
    textSize(40);

    textSize(30);
    var randColor;
    if (frameCount % 1 === 0) {
      randColor = random("red", "pink", "blue", "green", "yellow", "white");
      fill(randColor);
    }

    noStroke();
    stroke("white");
    textSize(40);
    stroke("white");
    fill("black")
    strokeWeight(4);
    text("Press which music you need", 200, 100);
music1.mousePressed(()=>{
  song.play();
  song.setVolume(1.0);
  hideAll()
  gameState = PLAY;
})

SPectreNcs.mousePressed(()=>{
  gameState = PLAY;
  SpeNcs.play();
  music2.hide();
  music1.hide();
  music3.hide();
  darks.hide();
  fa.hide();
  bgmpSP.hide();
  SPectreNcs.hide();
  on.hide();
  SpeNcs.setVolume(1.0);
})
bgmpSP.mousePressed(()=>{
  Her.play();
  hideAll()
  gameState = PLAY;
})
on.mousePressed(()=>{
  onmy.play();
  hideAll()
  onmy.setVolume(1.0);
  gameState = PLAY;
})

fa.mousePressed(()=>{
  fad.play();
  fad.setVolume(1.0);
  hideAll()
  gameState = PLAY;
})
music2.mousePressed(()=>{
  spec.play();
  spec.setVolume(1.0);
  hideAll()
  gameState = PLAY;
})
music3.mousePressed(()=>{
  alo.play();
  alo.setVolume(1.0);
  hideAll()
  gameState = PLAY;
})
darks.mousePressed(()=>{
  dar.play();
  dar.setVolume(1.0);
  hideAll()
  gameState = PLAY;
})
nomusic.mousePressed(()=>{
  hideAll()
  gameState = PLAY;
})
  }
  else{
    hideAll()
  }

  fill("white");
  noStroke()
  text("Coin Collected:" + coinNum, 50, 50);
  if (gameState === END) {
    background1.velocityX = 0;
    fill("red");
    textSize(60);
    stroke("red");
    strokeWeight(5);
    text("Game Over", 250, 200);
    if (keyDown("space")) {
      gameState = 1;
    }
    sonic.visible = false;
  }
}
function greeting() {
  sp = new SpeechSynthesisUtterance();
  sp.text = "Hai Welcome To Sonic The Hedgehog game";
  sp.rate = 0.9;
  window.speechSynthesis.speak(sp);
}
function spawnCoins() {
  coi = createSprite(1250, Math.round(random(260, 280)), 50, 50);
  coi.addImage(ringImg);
  coi.scale = 0.03;
  coi.velocityX = -7;

  CoinGR.add(coi);
}
function spawnEnemy() {
  enemy = createSprite(1100, Math.round(random(250, 290)), 50, 50);
  enemy.addImage(EnemyImg);
  enemy.scale = 0.2;
  enemy.velocityX = -7;

  EnemyGr.add(enemy);
}
function spawnPower() {
  powerS = createSprite(1300, Math.round(random(250, 290)), 50, 50);
  powerS.addImage(power);
  powerS.scale = 0.09;
  powerS.velocityX = -7;

  powerGr.add(powerS);
}
function hideAll(){
  music2.hide();
  music1.hide();
  music3.hide();
  darks.hide();
  fa.hide();
  bgmpSP.hide();
  SPectreNcs.hide();
  on.hide();
  nomusic.hide()
}
function showAll(){
  music2.show();
  music1.show();
  music3.show();
  darks.show();
  fa.show();
  bgmpSP.show();
  SPectreNcs.show();
  on.show();
  nomusic.show();
}