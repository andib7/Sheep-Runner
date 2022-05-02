class Sheep extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this); //add to scene
        this.resetX = x; 
        this.resetMoveSpeed = 1; 
        this.moveSpeed = 1; //pixels/frame
        this.inScene =  false;
        this.points = pointValue;
        this.entryAllowed = false;
    }

    update(dogX) {
        if (this.x > dogX && this.x <= game.config.width - this.width * .6 && this.x - dogX <= 150) {
            this.x += this.moveSpeed;
        }
        else if (this.x < dogX && this.x >= this.width * .6 && dogX - this.x <= 150) {
            this.x -= this.moveSpeed;
        }
        
    }

    enterScene(){
        if (this.x > game.config.width / 2) {
            this.x -= this.moveSpeed;
        }
        else if (this.x < game.config.width / 2) {
            this.x += this.moveSpeed;
        }
        if (this.x > this.width * .6 && this.x < game.config.width - this.width){
            this.inScene = true;
            this.entryAllowed = false;
            
        }
    }
}