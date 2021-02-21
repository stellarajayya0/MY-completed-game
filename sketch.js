var boy, boy_running
var bg, bgImg
var obstacle, obs1, obs2, obs3, obs4, obs5, obs6
var invisGround
var gameState = "play"
var score = 0
var obstaclesGroup
var gameOver,restart
var gameOverImg, restartImg

function preload(){
    boy_running = loadAnimation("Boy1.png","Boy2.png","Boy3.png","Boy4.png","Boy5.png","Boy6.png");
    bgImg = loadImage("bg4.png");
    obs1 = loadImage("Longspike.png")
    obs2 = loadImage("Rock.png")
    obs3 = loadImage("Turtleshell.png")
    //obs4 = loadImage("Shortspike.png")
    gameOverImg = loadImage("GameOver.jpg")
    restartImg = loadImage("restart.jpg")
}

function setup(){
createCanvas(800,400)
bg = createSprite(0,0,800,400)
bg.addImage(bgImg)
bg.scale = 1.5
bg.velocityX = -3
boy = createSprite(50,350,50,50)
boy.addAnimation("running",boy_running)
invisGround = createSprite(400,400,800,10)
invisGround.visible = true
obstaclesGroup = new Group()
gameOver = createSprite(400,200)
gameOver.addImage(gameOverImg)
restart = createSprite(400,240)
restart.addImage(restartImg)
restart.scale = 0.2
gameOver.scale  = 0.5
gameOver.visible = false
restart.visible = false
}

function draw(){
background(0)
drawSprites()
textSize(20)
stroke("red")
fill("red")
text("Score is "+score,500,50)
//console.log(boy.y)
if(gameState === "play"){
    score = score+1
    if(bg.x<100){
    bg.x = 500
    }
    if(keyDown("space")&&boy.y>=356){
        boy.velocityY = -14
    }
    boy.velocityY = boy.velocityY+0.8
    boy.collide(invisGround)
    spawnObstacles()
    if(obstaclesGroup.isTouching(boy)){
        gameState = "end"
    }
}
else if(gameState === "end"){
    gameOver.visible = true
    restart.visible = true
    //text("Score is "+score,500,50)
    invisGround.velocityX = 0
    bg.velocityX = 0
    boy.velocityY = 0
    obstaclesGroup.setVelocityXEach(0)
    obstaclesGroup.setLifeTimeEach(-1)
    if(mousePressedOver(restart)){
        reset()
    }
}
}
function spawnObstacles(){
    if(frameCount%100===0){
        obstacle = createSprite(800,380,30,50)
        obstacle.velocityX = -3
        var rand = Math.round(random(1,4))
        switch(rand){
            case 1 : obstacle.addImage(obs1)
            obstacle.scale = 0.5
            break
            
            case 2 : obstacle.addImage(obs2)
            obstacle.scale = 0.3
            break

            case 3 : obstacle.addImage(obs3)
            obstacle.scale = 0.3
            break

            /*case 4 : obstacle.addImage(obs4)
            obstacle.scale = 0.5
            break*/
            default : break
        }

        obstacle.lifetime = 270
        obstaclesGroup.add(obstacle) 
    }
    
    
    
}

function reset(){
    gameState = "play"
    gameOver.visible = false
    restart.visible = false
    obstaclesGroup.destroyEach()
    score = 0
}