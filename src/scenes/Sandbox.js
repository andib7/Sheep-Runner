class Sandbox extends Phaser.Scene{
    constructor(){
        super("sandboxScene"); 
    }

    preload(){
        // load images/tile sprites
        this.load.image('dog', './assets/dog.png');
        this.load.image('sheep', './assets/sheep.png');
        this.load.image('grass', './assets/background.png');
    }

    create(){
        this.grass = this.add.tileSprite(0,0,640,480, 'grass').setOrigin(0,0);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        this.dog = new Dog(this, game.config.width / 2, game.config.height-100, 'dog').setOrigin(0.5, 0);
        this.sheep1 = new Sheep(this, game.config.width / 2, game.config.height/3, 'sheep', 50).setOrigin(0.5, 0);
    } 

    update(){
        this.grass.tilePositionY -=2; 
        this.dog.update();
        this.sheep1.update(this.dog.x);

    }
    
}