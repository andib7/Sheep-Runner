class Dog extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture,frame);
        scene.add.existing(this); //add to scene

        this.moveSpeed = 3.5; //pixels/frame
    }

    preload(){
        this.load.spritesheet('dog', './assets/dogspritesheet.png', { frameWidth: 6, frameHeight: 9, startFrame: 0, endFrame: 3 });
    }

    create(){
        //animation config
        this.anims.create({
            key: 'dogMove',
            frames: this.anims.generateFrameNumbers('dog', { start: 0, end: 4, first: 0 }),
            frameRate: 30
        });
    }

    update(){
        this.anims.play('dogMove');
        if(keyLEFT.isDown && this.x >= this.width){
            this.x -= this.moveSpeed; 
        }
        else if (keyRIGHT.isDown && this.x <= game.config.width-this.width){
            this.x += this.moveSpeed;
        }
    }
}