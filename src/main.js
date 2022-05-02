let config = {
    type: Phaser.Auto,
    width: 640,
    height: 480,
    scene: [ Menu , Play ]
}

let game = new Phaser.Game(config);

let keyLEFT, keyRIGHT;