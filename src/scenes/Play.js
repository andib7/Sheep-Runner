class Sandbox extends Phaser.Scene{
    constructor(){
        super("sandboxScene"); 
    }

    preload(){
        // load images/tile sprites
        this.load.image('obstacle', './assets/fence.png');
        this.load.image('goal', './assets/pen.png');
        this.load.image('tempDog', './assets/dog.png');
        this.load.image('sheep', './assets/sheep.png');
        this.load.image('grass', './assets/background.png');

    }

    create(){
    
        //add background
        this.grass = this.add.tileSprite(0,0,640,480, 'grass').setOrigin(0,0);

        //set inputs
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        //create game objects
        this.dog = new Dog(this, game.config.width / 2, game.config.height-100).setOrigin(0.5, 0);

        this.sheep1 = new Sheep(this, -50, game.config.height / 3.1, 'sheep', 0, 50).setOrigin(0.5, 0);
        this.sheep2 = new Sheep(this, 50, game.config.height / 2.7, 'sheep', 0, 50).setOrigin(0.5, 0);
        this.sheep3 = new Sheep(this, 580, game.config.height / 2.9, 'sheep', 0, 50).setOrigin(0.5, 0);
        this.sheepList = new Array(this.sheep1, this.sheep2, this.sheep3); 
        
        
        this.obs1 = new Obstacle(this, game.config.width / 3, game.config.height / 10, 'obstacle').setOrigin(0.5, 0);
        this.obs2 = new Obstacle(this, game.config.width / 1.5, game.config.height / 10, 'obstacle').setOrigin(0.5, 0);
        this.obs3 = new Obstacle(this, game.config.width / 1.2, game.config.height / 10, 'obstacle').setOrigin(0.5, 0);
        this.obsList = new Array(this.obs1, this.obs2, this.obs3);

        this.goal = new Goal(this, game.config.width /4, -50, 'goal').setOrigin(0.5, 0);

        

        //initialized values
        this.collisionCheck = false; 
        this.sheep1.inScene = true;
        this.sheep3.inScene = true;
        this.sheepCount = 1; 

        this.score = 0;

        this.sheepTimer = this.time.addEvent({
            delay: 5000, 
            callback: this.addSheep, 
            callbackScope: this, 
            loop: true
        })
    }

    update(){
        //update movement
        this.grass.tilePositionY -=1.5; 
        this.dog.update();
        this.goal.update();
        this.sheepList.forEach(element => {
            element.update(this.dog.x)
        });
        this.obsList.forEach(element => {
            element.update();
        });

        // check collisions
        //obs to other sprites
        this.obsList.forEach(obsElement => {
            if (this.checkCollision(this.dog, obsElement)) {
                console.log('Dog hit obstacle');
            }
            this.sheepList.forEach((sheepElement) => {
                if (this.checkCollision(sheepElement, obsElement)) {
                    sheepElement.inScene = false;
                    sheepElement.x = sheepElement.resetX; //resets sheep
                    console.log('Sheep Hit obstacle');
                }
            });
        });
        //sheep to sheep
        this.sheepList.forEach(sheepElement1 => {
            this.sheepList.forEach((sheepElement2) => {
                if (sheepElement1 != sheepElement2 && this.checkCollision(sheepElement1, sheepElement2)) {
                    console.log('Sheep Hit sheep'); 
                    if (sheepElement1.x < sheepElement2.x){
                        sheepElement2.x += sheepElement2.moveSpeed;
                    }
                    else {
                        sheepElement1.x -= sheepElement1.moveSpeed;
                        sheepElement2.x -= sheepElement2.moveSpeed;
                    }
                }
            });
        });
        //sheep to goal
        this.sheepList.forEach((sheepElement) => {
            if (this.checkCollision(sheepElement, this.goal)) {
                console.log('Sheep Hit goal');
                sheepElement.inScene = false; 
                sheepElement.x = sheepElement.resetX; //resets sheep
                this.score += 30;
            }
        });
        
        //keep track of score
        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(50, 50, this.score, scoreConfig);
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
            this.sheepList.forEach((sheepElement) => {
                if (sheepElement.inScene == false){
                    sheepElement.enterScene();
                    sheepElement.inScene = true; 
                    return;
                }
            });
        }
        else{return;}
    }

}