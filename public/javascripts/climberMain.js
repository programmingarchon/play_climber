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
    var map = {
        name: "first level",
        worldObjects: [
            {type: "character", x:0, y:290},
            {type: "box", x:0, y:290},
            {type: "box", x:16, y:290},
            {type: "box", x:32, y:290},
            {type: "box", x:48, y:290},
            {type: "box", x:64, y:290},
            {type: "box", x:80, y:290}
        ]
    }

    game.onload = function() {
        initLevel(game, map);
    };

    function initLevel(game, mapData) {
        $.each(mapData.worldObjects, function(index, object) {
            if(object.type === "box") {
                game.rootScene.addChild(new Block(object.x, object.y));
            } else if(object.type === "character") {
                character = new Character();
                game.rootScene.addChild(character);
            }
        })
    }
    game.start();
};
