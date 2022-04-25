class Sandbox extends Phaser.Scene{
    constructor(){
        super("sandboxScene"); 
    }

    preload(){
        // load images/tile sprites
        this.load.image('obstacle', './assets/obstacle.png');
        this.load.image('goal', './assets/pen.png');
        this.load.image('dog', './assets/dog.png');
        this.load.image('sheep', './assets/sheep.png');
        this.load.image('grass', './assets/background.png');
    }



    create(){
        this.grass = this.add.tileSprite(0,0,640,480, 'grass').setOrigin(0,0);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        this.dog = new Dog(this, game.config.width / 2, game.config.height-100, 'dog').setOrigin(0.5, 0);

        this.sheep1 = new Sheep(this, game.config.width / 2, game.config.height / 3.1, 'sheep', 0, 50).setOrigin(0.5, 0);
        this.sheep2 = new Sheep(this, 50, game.config.height / 2.7, 'sheep', 0, 50).setOrigin(0.5, 0);
        this.sheep3 = new Sheep(this, 580, game.config.height / 2.9, 'sheep', 0, 50).setOrigin(0.5, 0);
        this.sheepList = new Array(this.sheep1, this.sheep2, this.sheep3); 
        //this.unplacedSheep = new Array(this.sheep2, this.sheep3); 
        
        this.obs1 = new Obstacle(this, game.config.width / 3, game.config.height / 3, 'obstacle').setOrigin(0.5, 0);
        this.obs2 = new Obstacle(this, game.config.width / 1.5, game.config.height / 3, 'obstacle').setOrigin(0.5, 0);
        this.obs3 = new Obstacle(this, game.config.width / 1.2, game.config.height / 3, 'obstacle').setOrigin(0.5, 0);
        this.obsList = new Array(this.obs1, this.obs2, this.obs3);

        this.goal = new Goal(this, game.config.width /4, -50, 'goal').setOrigin(0.5, 0);

        this.collisionCheck = false; 
        this.sheepCount = 0; 

        this.score = 0;

    } 

    update(){

        this.grass.tilePositionY -=1.5; 
        this.dog.update();
        this.goal.update();
        this.sheepList.forEach(element => {
            element.update(this.dog.x)
        });
        this.obsList.forEach(element => {
            //console.log(element);
            element.update();
        });

        // check collisions
        this.obsList.forEach(obsElement => {
            if (this.checkCollision(this.dog, obsElement)) {
                console.log('Dog hit obstacle');
            }
            this.sheepList.forEach((sheepElement) => {
                if (this.checkCollision(sheepElement, obsElement)) {
                    console.log('Sheep Hit obstacle');
                    sheepElement.x = game.config.width / 2; //resets sheep
                }
            });
        });

        this.sheepList.forEach((sheepElement) => {
            if (this.checkCollision(sheepElement, this.goal)) {
                console.log('Sheep Hit goal');
                sheepElement.x = game.config.width / 2; //resets sheep
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

        /*scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(2000, () => {
            this.unplacedSheep[0].addSheep();
            //this.unplacedSheep.pop();
        }, null, this);*/

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

}