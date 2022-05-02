class Goal extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this); //add to scene
        this.moveSpeed = .8; //pixels/frame
    }sssssssss

    update() {
        if (this.y < game.config.height) {
            this.y += this.moveSpeed;
        }
        if (this.y >= game.config.height) {
            this.y = -420;
            this.x = Math.floor(Math.random() * (game.config.width / 10 * 8)) + game.config.width / 10
        }
    }
}