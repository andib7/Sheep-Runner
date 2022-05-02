class Play extends Phaser.Scene{
    constructor(){
        super("playScene"); 
    }

    preload(){
        
        // load images/tile sprites
        this.load.image('obstacle', './assets/fence.png');
        this.load.image('goal', './assets/pen.png');
        this.load.image('sheep', './assets/sheep.png');
        this.load.image('grass', './assets/background.png');
        this.load.image('0lives', './assets/0lives.png');
        this.load.image('1life', './assets/1lives.png');
        this.load.image('2lives', './assets/2lives.png');
        this.load.image('3lives', './assets/3lives.png');
        this.load.spritesheet('dog', './assets/dogspritesheet.png', { frameWidth: 26, frameHeight: 68, startFrame: 0, endFrame: 3 });

    }

    create(){
     
        //music
        this.music = this.sound.add('sfx_music');
        this.music.setLoop(true);
        this.music.play();

        //add background
        this.grass = this.add.tileSprite(0,0,640,480, 'grass').setOrigin(0,0);

        //set inputs
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        //create game objects
        this.dog = new Dog(this, game.config.width / 2, game.config.height-100, 'dog').setOrigin(0.5, 0);

        this.sheep1 = new Sheep(this, game.config.width + 50, game.config.height / 1.9, 'sheep', 0, 50).setOrigin(0.5, 0);
        this.sheep2 = new Sheep(this, -50, game.config.height / 2.7, 'sheep', 0, 50).setOrigin(0.5, 0);
        this.sheep3 = new Sheep(this, game.config.width + 50, game.config.height / 2.9, 'sheep', 0, 50).setOrigin(0.5, 0);
        this.sheep4 = new Sheep(this, -50, game.config.height / 1.7, 'sheep', 0, 50).setOrigin(0.5, 0);
        this.sheepList = new Array(this.sheep1, this.sheep2, this.sheep3, this.sheep4); 
        
        this.obs1 = new Obstacle(this, game.config.width / 3, -420, 'obstacle').setOrigin(0.5, 0);
        this.obs2 = new Obstacle(this, game.config.width / 1.5, 0, 'obstacle').setOrigin(0.5, 0);
        this.obs3 = new Obstacle(this, game.config.width / 1.2, -210, 'obstacle').setOrigin(0.5, 0);
        this.obsList = new Array(this.obs1, this.obs2, this.obs3);

        this.goal = new Goal(this, game.config.width /4, 50, 'goal').setOrigin(0.5, 0);

        //life counter display
        this.livesDisplay = this.add.image(game.config.width / 10, game.config.height *.9, '3lives')
        this.livesDisplay.setScale(.6);

        //animation config
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('dog', {frames: [0,1,2,3] }),
            frameRate: 8,
            repeat: -1
        });
        this.dog.play('walk');

        //initialized values
        this.collisionCheck = false; 
        this.sheep1.x = game.config.width/2;
        this.sheep1.inScene = true;
        this.sheepCount = 1; 
        this.nextSheep = this.sheep2;
        this.livesCount = 1;
        this.gameOver = false;

        this.score = 0;

        this.sheepTimer = this.time.addEvent({
            delay: 5000, 
            callback: this.addSheep, 
            callbackScope: this, 
            loop: true
        })
    }

    update(){
        // check key input for restart
        if (this.gameOver) {
            console.log("ENt");
            this.music.stop();
            this.scene.restart();
        }

        //updates movement when game is running 
        if(!this.gameOver){
            //update movement
            this.grass.tilePositionY -= 1;
            this.dog.update();
            this.goal.update();
            this.sheepList.forEach(element => {
                element.update(this.dog.x)
            });
            this.obsList.forEach(element => {
                element.update();
            });
            //sheep entering scene
            if (this.nextSheep.entryAllowed == true) {
                this.nextSheep.enterScene();
            }
        }
        else{
            this.scene.pause();
        }

        // check collisions
        //obs to other sprites
        this.obsList.forEach(obsElement => {
            if (this.checkCollision(this.dog, obsElement) && this.dog.invincibleStatus == false) {
                this.dog.invincibleStatus = true;
                this.livesCount-=1; 
                this.timer = this.time.delayedCall(2000, () => {
                    this.dog.invincibleStatus = false;
                })
            }
            this.sheepList.forEach((sheepElement) => {
                if (this.checkCollision(sheepElement, obsElement)) {
                    this.livesCount -= 1; 
                    sheepElement.inScene = false;
                    sheepElement.x = sheepElement.resetX; //resets sheep
                    sheepElement.entryAllowed = false;
                }
            });
        });
        //sheep to sheep
        this.sheepList.forEach(sheepElement1 => {
            this.sheepList.forEach((sheepElement2) => {
                if (sheepElement1 != sheepElement2 && this.checkCollision(sheepElement1, sheepElement2)) {
                    if (sheepElement1.x < sheepElement2.x){
                        if(sheepElement2.x >= game.config.width - sheepElement2.width * .6){
                            sheepElement1.x -= sheepElement1.moveSpeed;
                            sheepElement2.moveSpeed = 0;
                        }
                        sheepElement2.x += sheepElement2.moveSpeed;
                    }
                    else {
                        sheepElement1.x -= sheepElement1.moveSpeed;
                        sheepElement2.x -= sheepElement2.moveSpeed;
                    }
                }
                sheepElement1.moveSpeed = sheepElement1.resetMoveSpeed;
                sheepElement2.moveSpeed = sheepElement2.resetMoveSpeed;
            });
        });
        //sheep to goal
        this.sheepList.forEach((sheepElement) => {
            if (this.checkCollision(sheepElement, this.goal)) {
                sheepElement.inScene = false; 
                sheepElement.x = sheepElement.resetX; //resets sheep
                this.score += 30;
            }
        }); 
        
        //display lives
        if(this.livesCount == 2){
            this.livesDisplay = this.add.image(game.config.width / 10, game.config.height * .9, '2lives')
            this.livesDisplay.setScale(.6);
        }
        else if(this.livesCount == 1){
            this.livesDisplay = this.add.image(game.config.width / 10, game.config.height * .9, '1life')
            this.livesDisplay.setScale(.6);
        }
        else if (this.livesCount <= 0) {
            this.livesDisplay = this.add.image(game.config.width / 10, game.config.height * .9, '0lives')
            this.livesDisplay.setScale(.6);
            this.gameOver = true;
        }

        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#ADD8E6',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(50, 50, this.score, scoreConfig);

        //when game is over
        if(this.gameOver){
            scoreConfig.fixedWidth = 0;
            this.add.text(game.config.width / 2, game.config.height / 5, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width / 2, game.config.height / 5 + 30, 'Press R to play again', scoreConfig).setOrigin(0.5);
        }

        
    }

    checkCollision(object, obstacle) {
        // simple AABB checking
        if (object.x < obstacle.x + obstacle.width &&
            object.x + object.width > obstacle.x &&
            object.y < obstacle.y + obstacle.height &&
            object.height + object.y > obstacle.y) {
            return true;
        } else {
            return false;
        }
    }

    addSheep(){
        if(this.sheepCount < 5){
            for(const sheep of this.sheepList){
                if(sheep.inScene == false){
                    sheep.entryAllowed = true; 
                    this.nextSheep = sheep;
                    return;
                }
            }
            return;
        }
        else{return;}
    }
}