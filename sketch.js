var path, boy, cash, diamonds, jwellery, sword, cat, G1, miau, lluvia, brillo1, brillo2;
var pathImg, boyImg, cashImg, diamondsImg, jwelleryImg, swordImg, catImg, G1Img, G2Img, barrioSound, pasosSound, miauSound, gameoverSound;
var treasureCollection = 0;
var cashG, diamondsG, jwelleryG, swordGroup;

//Game States
var PLAY=1;
var END=0;
var gameState=2;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg = loadAnimation("gameOver.png");
  catImg = loadImage("gato_negro_2.png");
  G1Img = loadAnimation("gota 1.png", "gota 2.png");
  barrioSound = loadSound("barrio.mp3");
  pasosSound = loadSound("pasos veloces.mp3");
  miauSound = loadSound("miau.mp3");
  lluvia = loadSound("lluvia.mp3");
  brillo1 = loadSound("brillo 1.mp3");
  brillo2 = loadSound("brillo 2.mp3");
  gameoverSound = loadSound("GAME OVER.mp3");
}

function setup(){
  
//crear el canvas y ajustar el tamaño de la ventana para que sea compatible con el dispositivo

createCanvas(windowWidth, windowHeight);

path=createSprite(width/2,200);
path.addImage(pathImg);
path.velocityY = 4;


//crear sprite boy corriendo
boy = createSprite(width/2,height-20,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;

//gatos
cat = createSprite(100,70);
cat.addImage(catImg);
cat.scale = 0.5;

//Sonidos

  
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();

}

function draw() {
  
  if(gameState > PLAY && gameState > END){
    background(0);
    textSize(30);
    text("presiona -ENTER- para jugar", windowWidth/3, windowHeight/2);
    if(keyWentDown("Enter") || touches.length > 0){
      lluvia.play();
      pasosSound.play();
      gameState = PLAY
    }
  }



  if(gameState===PLAY){
  background(0);
  boy.x = World.mouseX;
  boy.x = touches.x;
  touches = []; 
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //código para reiniciar el fondo
  
  if(path.y > windowHeight){
  path.y = height/2;
  }
    createCash();
    createDiamonds();
    createJwellery();
    createSword();
    createGotas();

    if (cashG.isTouching(boy)) {
      brillo1.play();
      cashG.destroyEach();
      treasureCollection=treasureCollection + 50;
    }
    else if (diamondsG.isTouching(boy)) {
      brillo2.play();
      diamondsG.destroyEach();
      treasureCollection=treasureCollection + 100;
      
    }else if(jwelleryG.isTouching(boy)) {
      brillo1.play();
      jwelleryG.destroyEach();
      treasureCollection= treasureCollection + 150;
      
    }else{
      if(swordGroup.isTouching(boy)) {
        gameState=END;
        
        lluvia.stop();
        pasosSound.stop();
        barrioSound.stop();
        
        boy.addAnimation("SahilRunning",endImg);
        boy.x=width/2;
        boy.y=height/2;
        boy.scale=0.6;
        
        cashG.destroyEach();
        diamondsG.destroyEach();
        jwelleryG.destroyEach();
        swordGroup.destroyEach();
        
        cashG.setVelocityYEach(0);
        diamondsG.setVelocityYEach(0);
        jwelleryG.setVelocityYEach(0);
        swordGroup.setVelocityYEach(0);

        G1.destroy();

        gameoverSound.play();


    }
  }
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Tesoro: "+ treasureCollection,width-150,30);

  }

}

function createCash() {
  if (World.frameCount % 200 == 0) {
   //Modificar las posiciones del dinero 
    var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
    cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 5;
  cash.lifetime = 200;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 320 == 0) {
       // Modificar las posiciones de los diamantes 

    var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
    diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 5;
  diamonds.lifetime = 200;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 410 == 0) {
    //Modificar las posiciones de las joyas para hacerlas aparecer en el tamaño de pantaña disponible.

    var jwellery = createSprite(Math.round(random(50, 350),40, 10, 10));
    jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 5;
  jwellery.lifetime = 200;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 530 == 0) {
    //Modificar las prosiciones de la espada para hacerla aparecer en el tamaño de pantaña disponible. 

    var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
    sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 4;
  sword.lifetime = 200;
  swordGroup.add(sword);  
  }
}

function createGotas(){
  if (World.frameCount % 20 == 0) {
  //Gotas
    G1 = createSprite(Math.round(random(60, width)), (random(100, height)), 10, 10);
    G1.addAnimation("gotas", G1Img);
    G1.scale=0.07;
    G1.lifetime = 15;
  }
}
