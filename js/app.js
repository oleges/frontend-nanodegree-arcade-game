// Initialize constants for positioning sprites
var BEHIND_LEFT_BORDER_POS = -100;
var CELL_HEIGHT = 83;
var CELL_WIDTH = 101;
var VERTICAL_OFFSET = 30;
var HORIZONTAL_OFFSET = 30;

// Helper array of free rows
var freeRows = [1, 2, 3];

// Helper function to add variability in enemy's behaviour
var getRandVal = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.reset();
}

Enemy.prototype.reset = function() {
    this.x = BEHIND_LEFT_BORDER_POS;
    this.y = CELL_HEIGHT * freeRows.pop() - VERTICAL_OFFSET;
    this.speed = getRandVal(1, 5) * 100;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x > 500) {
        this.x = BEHIND_LEFT_BORDER_POS;
    }
    // Detecting collisions
    if (this.x > player.x - CELL_WIDTH + HORIZONTAL_OFFSET &&
        this.x < player.x + CELL_WIDTH - HORIZONTAL_OFFSET &&
        this.y == player.y) {
        player.reset();
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.reset();
}

Player.prototype.reset = function() {
    this.x = CELL_WIDTH * 2;
    this.y =  CELL_HEIGHT * 5 - VERTICAL_OFFSET;
}

Player.prototype.update = function(dt) {
    if (this.y < CELL_HEIGHT - VERTICAL_OFFSET) {
        this.reset();
    }
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(pressedKey) {
    switch(pressedKey) {
        case 'left':
            if (this.x >= CELL_WIDTH) {
                this.x -= CELL_WIDTH;
            }
            break;
        case 'up':
            this.y -= CELL_HEIGHT;
            break;
        case 'right':
            if (this.x <= CELL_WIDTH * 3) {
                this.x += CELL_WIDTH;
            }
            break;
        case 'down':
            if (this.y <= CELL_HEIGHT * 4 - VERTICAL_OFFSET) {
                this.y += CELL_HEIGHT;
            }
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var bug1 = new Enemy();
var bug2 = new Enemy();
var bug3 = new Enemy();
var allEnemies = [];
allEnemies.push(bug1, bug2, bug3);
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
