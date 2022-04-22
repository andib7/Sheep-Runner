class Sheep extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this); //add to scene

        this.moveSpeed = 1; //pixels/frame
    }

    update(dogX) {
        if(dogX-this.x <= 200){ //sheep will move only after seeing the dog within this distance
            if (this.x > dogX && this.x <= game.config.width - this.width) {
                this.x += this.moveSpeed;
            }
            else if (this.x < dogX && this.x >= this.width) {
                this.x -= this.moveSpeed;
            }
        }
        
    }

}