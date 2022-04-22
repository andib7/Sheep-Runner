class Dog extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture,frame);
        scene.add.existing(this); //add to scene

        this.moveSpeed = 3.5; //pixels/frame
    }

    update(){
        if(keyLEFT.isDown && this.x >= this.width){
            this.x -= this.moveSpeed; 
        }
        else if (keyRIGHT.isDown && this.x <= game.config.width-this.width){
            this.x += this.moveSpeed;
        }
    }


}