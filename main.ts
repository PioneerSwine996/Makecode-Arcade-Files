 // ==========================
// Constants
// ==========================
const TILE_PLAYER_SPAWN = assets.tile``
const TILE_ENEMY_SPAWN = assets.tile`EnemySpawn`
const GRAVITY = 500
const JUMP_VELOCITY = -200
const DOUBLE_JUMP_VELOCITY = -180
const COYOTE_TIME = 200 // milliseconds

// ==========================
// Globals
// ==========================
let player: Sprite = null
let canDoubleJump = false
let jumpTimer = 0
let level = 0

// ==========================
// Classes
// ==========================
class Enemy extends sprites.ExtendableSprite {
    hitPoints: number

    constructor(image: Image, kind: number) {
        super(image, kind)
        this.hitPoints = 1
    }

    takeDamage() {
        this.hitPoints--
        if (this.hitPoints <= 0) {
            this.destroy()
        }
    }
}

class GoombaEnemy extends Enemy {
    constructor() {
        super(img`
            . . .
        `, SpriteKind.Enemy)
        this.vx = -30
    }

    update(dt: number) {
        // Flip direction on wall hit
        if (this.isHittingTile(CollisionDirection.Left) || this.isHittingTile(CollisionDirection.Right)) {
            this.vx *= -1
        }
    }
}

class KoopaEnemy extends Enemy {
    constructor() {
        super(img`
            . . .
        `, SpriteKind.Enemy)
        this.vx = -50
        this.hitPoints = 2
    }

    update(dt: number) {
        // Flip direction on wall hit
        if (this.isHittingTile(CollisionDirection.Left) || this.isHittingTile(CollisionDirection.Right)) {
            this.vx *= -1
        }
    }
}

// ==========================
// Functions
// ==========================
function startLevel(levelNumber: number) {
    if (levelNumber == 0) {
        tiles.setTilemap(tilemap`level0`)
    } else {
        tiles.setTilemap(tilemap`level1`)
    }
    level = levelNumber

    tiles.placeOnRandomTile(player, TILE_PLAYER_SPAWN)
    scene.cameraFollowSprite(player)
    placeEnemies()
}

function placeEnemies() {
    for (let loc of tiles.getTilesByType(TILE_ENEMY_SPAWN)) {
        let enemy: Enemy = Math.percentChance(50) ? new GoombaEnemy() : new KoopaEnemy()
        tiles.placeOnTile(enemy, loc)
        tiles.setTileAt(loc, assets.tile`transparency16`)
    }
}

function destroyTileAbove() {
    let tileAbove = tiles.getTileLocation(player.tilemapLocation().column, player.tilemapLocation().row - 1)
    if (tiles.tileAtLocationIsWall(tileAbove)) {
        tiles.setTileAt(tileAbove, assets.tile`transparency16`)
        music.baDing.play()
    }
}

// ==========================
// Event Handlers
// ==========================
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (player.isHittingTile(CollisionDirection.Bottom) || game.runtime() - jumpTimer < COYOTE_TIME || canDoubleJump) {
        player.vy = canDoubleJump ? DOUBLE_JUMP_VELOCITY : JUMP_VELOCITY
        if (!player.isHittingTile(CollisionDirection.Bottom)) {
            canDoubleJump = false
        }
        jumpTimer = game.runtime()
    }
})

controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(player, [img`left1`, img`left2`], 100, true)
})

controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(player, [img`right1`, img`right2`], 100, true)
})

controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    destroyTileAbove()
})

scene.onOverlapTile(SpriteKind.Player, assets.tile`doorTile`, function (sprite, location) {
    startLevel(1 - level)
})

// ==========================
// Main
// ==========================
player = sprites.create(img`
    . . .
`, SpriteKind.Player)
player.ay = GRAVITY
canDoubleJump = true

startLevel(0)

// ==========================
// Game Loop
// ==========================
game.onUpdate(function () {
    for (let enemy of sprites.allOfKind(SpriteKind.Enemy)) {
        (enemy as Enemy).update(game.currentScene().eventContext.deltaTime)
    }

    if (player.isHittingTile(CollisionDirection.Bottom)) {
        canDoubleJump = true
    }
})