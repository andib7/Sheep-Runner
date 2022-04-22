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
    }

    update(){
        this.grass.tilePositionY -=2; 
    }

}