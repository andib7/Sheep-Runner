class Sheep extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this); //add to scene
        this.moveSpeed = 1; //pixels/frame
        this.inScene =  false;
        this.points = pointValue;
    }

    update(dogX) {
        if (this.x > dogX && this.x <= game.config.width - this.width*1.6 && this.x - dogX <= 200) {
            this.x += this.moveSpeed;
        }
        else if (this.x < dogX && this.x >= this.width*1.5 && dogX - this.x <= 200) {
            this.x -= this.moveSpeed;
        }
        
    }

}