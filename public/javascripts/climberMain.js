enchant();


Character = Class.create(Sprite, {
    initialize: function() {
        Sprite.call(this, 16, 16);
        this.image = game.assets["../assets/images/climber/character.png"];
        this.x = 0;
        this.y = 260;
        this.moveSpeed = 2;
        this.gravitySpeed = 2;
    },

    onenterframe: function() {
        if(game.input.left && !game.input.right){
            this.x -= this.moveSpeed;
        } else if(game.input.right && !game.input.left){
            this.x += this.moveSpeed;
        }
        this.y += this.gravitySpeed;
    }
});

Block = Class.create(Sprite, {
    initialize: function() {
        Sprite.call(this, 16, 16);
        this.image = game.assets["../assets/images/climber/block.png"];
        this.x = 0;
        this.y = 290;
    },

    onenterframe: function() {
        if (this.intersect(character)) {
            character.gravitySpeed = 0;
        }
    }
});

window.onload = function(){
    game = new Core(320, 320);
    game.fps = 15;
    game.preload("../assets/images/climber/character.png");
    game.preload("../assets/images/climber/block.png");
    game.keybind(65, 'left');
    game.keybind(68, 'right');
    game.keybind(87, 'up');
    game.keybind(83, 'down');
    game.onload = function() {
        character = new Character();
        var block = new Block();
        game.rootScene.addChild(character);
        game.rootScene.addChild(block);

    };
    game.start();
};
