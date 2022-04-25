class Goal extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this); //add to scene
        this.moveSpeed = 1.5; //pixels/frame
    }

    update() {
        if (this.y < game.config.height) {
            this.y += this.moveSpeed;
        }
        if (this.y >= game.config.height) {
            this.y = -30;
        }
    }
}