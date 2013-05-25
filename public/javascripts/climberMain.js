enchant();

window.onload = function(){
    game = new Core(600, 320);
    game.fps = 15;
    game.preload("../assets/images/climber/character.png");
    game.preload("../assets/images/climber/block.png");
    game.keybind(65, 'left');
    game.keybind(68, 'right');
    game.keybind(87, 'up');
    game.keybind(83, 'down');
    game.keybind(32, 'space');
    game.onload = function() {
        character = new Character();
        game.rootScene.addChild(character);
        game.rootScene.addChild(new Block(0,290));
        game.rootScene.addChild(new Block(50, 290));
        game.rootScene.addChild(new Block(100, 290));
        game.rootScene.addChild(new Block(150, 290));
        game.rootScene.addChild(new Block(200, 290));
        game.rootScene.addChild(new Block(250, 290));
        game.rootScene.addChild(new Block(266, 290));
        game.rootScene.addChild(new Block(282, 290));
        game.rootScene.addChild(new Block(298, 290));
    };
    game.start();
};
