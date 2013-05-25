Character = Class.create(Sprite, {
    initialize: function() {
        Sprite.call(this, 16, 16);
        this.image = game.assets["../assets/images/climber/character.png"];
        this.x = 0;
        this.y = 260;
        this.yAcceleration = 0;
        this.xAcceleration = 0;
        this.xMaxAcceleration = 4;
        this.yMaxAcceleration = 6;
        this.moveSpeed = 2;
        this.jumpPower = 15;
        this.gravitySpeed = 2;
        this.onGround = false;
        this.collidedObject = null;
        this.drag = 0.5;
    },

    onenterframe: function() {
        if(game.input.left && !game.input.right) {
            this.xAcceleration -= this.moveSpeed;
        } else if(game.input.right && !game.input.left) {
            this.xAcceleration += this.moveSpeed;
        }
        if(game.input.space) {
            if(this.onGround) {
                this.jump();
            }
        }
        this.checkOnGround();
        this.calculateAndApplyAccelerations();
    },

    jump: function() {
        this.yAcceleration = -this.jumpPower;
        this.onGround = false;
    },

    calculateAndApplyAccelerations: function() {
        if(!this.onGround) {
            this.yAcceleration += this.gravitySpeed;
        }
        if(this.xAcceleration != 0) {
            if(this.xAcceleration > 0) {
                this.xAcceleration -= this.drag;
            } else {
                this.xAcceleration += this.drag;
            }
        }
        if(this.yAcceleration > this.yMaxAcceleration) {
            this.yAcceleration = this.yMaxAcceleration;
        }
        if(this.xAcceleration > this.xMaxAcceleration) {
            this.xAcceleration = this.xMaxAcceleration;
        } else if(this.xAcceleration < -this.xMaxAcceleration) {
            this.xAcceleration = -this.xMaxAcceleration;
        }
        this.y += this.yAcceleration;
        this.x += this.xAcceleration;
    },

    checkOnGround: function() {
        if(this.collidedObject) {
            if (!this.intersect(this.collidedObject)) {
                this.onGround = false;
                this.collidedObject = null;
            }
        }
    },

    hitGround: function(collidedObject) {
        this.collidedObject = collidedObject;
        this.onGround = true;
        this.yAcceleration = 0;
    }
});