class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }

    preload(){
        this.load.audio('sfx_music', './assets/EndlessRunner.wav');
        this.load.audio('sfx_collect', './assets/collect.wav');
        this.load.audio('sfx_dogHit', './assets/doghit.wav');
        this.load.audio('sfx_sheepHit', './assets/sheephit.wav');
        this.load.audio('sfx_gameOver', './assets/gameover.wav');
        this.load.image('main', './assets/SheepRunnerMain.png')
    }

    create(){
        this.menuSceen = this.add.image(game.config.width / 2, game.config.height / 2, 'main');
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keyRIGHT)){
            this.scene.start('playScene');
        }
    }
}