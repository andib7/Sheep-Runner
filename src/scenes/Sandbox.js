class Sandbox extends Phaser.Scene{
    constructor(){
        super("sandboxScene"); 
    }

    preload(){
        // load images/tile sprites
        this.load.image('obstacle', './assets/obstacle.png');
        this.load.image('dog', './assets/dog.png');
        this.load.image('sheep', './assets/sheep.png');
        this.load.image('grass', './assets/background.png');
    }



    create(){
        this.grass = this.add.tileSprite(0,0,640,480, 'grass').setOrigin(0,0);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        this.dog = new Dog(this, game.config.width / 2, game.config.height-100, 'dog').setOrigin(0.5, 0);

        this.sheepList = []; 
        this.sheepList[0] = this.sheep1 = new Sheep(this, game.config.width / 2, game.config.height / 3, 'sheep', 50).setOrigin(0.5, 0);
        this.sheepList[1] = this.sheep2 = new Sheep(this, game.config.width / 4, game.config.height / 4, 'sheep', 50).setOrigin(0.5, 0);
        this.sheepList[2] = this.sheep3 = new Sheep(this, game.config.width / 4, game.config.height / 4, 'sheep', 50).setOrigin(0.5, 0);
        this.sheepList[3] = this.sheep4 = new Sheep(this, game.config.width / 4, game.config.height / 4, 'sheep', 50).setOrigin(0.5, 0);
        this.sheepList[4] = this.sheep5 = new Sheep(this, game.config.width / 4, game.config.height / 4, 'sheep', 50).setOrigin(0.5, 0);
        this.sheepList[5] = this.sheep6 = new Sheep(this, game.config.width / 4, game.config.height / 4, 'sheep', 50).setOrigin(0.5, 0);
        this.sheepList[6] = this.sheep7 = new Sheep(this, game.config.width / 4, game.config.height / 4, 'sheep', 50).setOrigin(0.5, 0);
        this.sheepList[7] = this.sheep8 = new Sheep(this, game.config.width / 4, game.config.height / 4, 'sheep', 50).setOrigin(0.5, 0);
        
        this.obsList = [];
        this.obsList[0] = this.obs1 = new Obstacle(this, game.config.width / 3, game.config.height / 3, 'obstacle', 50).setOrigin(0.5, 0);
        this.obsList[1] = this.obs2 = new Obstacle(this, game.config.width / 3, game.config.height / 3, 'obstacle', 50).setOrigin(0.5, 0);
        this.obsList[2] = this.obs3 = new Obstacle(this, game.config.width / 3, game.config.height / 3, 'obstacle', 50).setOrigin(0.5, 0);

        this.timerDone = true; 
        this.collisionCheck = false; 
        this.sheepCount = 0; 
        
    } 

    update(){

        this.grass.tilePositionY -=2; 
        this.dog.update();
        for (let j = 0; j < 8; j++) {
            this.sheepList[j].update(this.dog.x);
        }

        // check collisions
        for (let i = 0; i < 3; i++) {
            if (this.checkCollision(this.dog, this.obsList[i])) {
                console.log('Dog hit obstacle');
            }
            for (let j = 0; j < 8; j++) {
                if (this.checkCollision(this.sheepList[j], this.obsList[i])) {
                    console.log('Sheep Hit obstacle');
                }
            }
        }
        
        //Check Timer + add sheep
        while(this.timerDone == true && this.sheepCount <= 8){
            this.timerDone = false;
            this.clock = this.time.delayedCall(7000, this.addSheep(this.sheepCount), null, this);

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

    addSheep(sheepCount){

        this.timerDone = true; 
    }
}