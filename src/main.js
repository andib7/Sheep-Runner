/*
Programmers: Andi Barron
Designers: Maya Brown, Ellen Kim
Game Title: Sheep Runners
Date Completed: 2 May 2022
Creative Tilt Justification: 
Programming: I am proud of the programming techniques used
for this game. I do not think our game has something interesting or a technique that
stands out but we were able to make our game without something like that. I definately
used many non class examples especially examples on the Phaser 3 page. I learned a lot
of new techniques that I will definately use in the future. One cool one I was proud of
was how I implemented the collision with sheep so they move together but have some drag 
since one is pretty much pushing the other. 
Art: 

*/


let config = {
    type: Phaser.Auto,
    width: 640,
    height: 480,
    scene: [ Menu , Play ]
}

let game = new Phaser.Game(config);

let keyR, keyLEFT, keyRIGHT;