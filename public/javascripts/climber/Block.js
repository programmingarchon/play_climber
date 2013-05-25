Block = Class.create(Sprite, {
    initialize: function(x, y) {
        console.log("instantianting blox " + x + ":" + y)
        Sprite.call(this, 16, 16);
        this.image = game.assets["../assets/images/climber/block.png"];
        this.x = x;
        this.y = y;
    },

    onenterframe: function() {
        if (this.intersect(character)) {
            character.hitGround(this)
        }
    }
});