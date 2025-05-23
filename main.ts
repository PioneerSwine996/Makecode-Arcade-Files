// #9
namespace SpriteKind {
    export const Block = SpriteKind.create()
}

let Player : Sprite = null
let Enemy : Sprite = null
let Food : Sprite = null
let Block2 : Sprite = null
let Block1 : Sprite[] = []
// #10
let canDoubleJump = false
// #4
let Gravity = 125
// #4
let JumpSpeed = -125

PlayerSprite()
EnemySprite()
PowerupBlock()

function PlayerSprite() {
    // #1
    scene.setTileMapLevel(assets.tilemap`
    level1
    `)
    // #2
    Player = sprites.create(assets.image`
        Player
        `, SpriteKind.Player)
    // #3
    scene.cameraFollowSprite(Player)
    Player.ay = Gravity
    let ph = tiles.getTilesByType(sprites.dungeon.collectibleInsignia)
    for (let i = 0; i < ph.length; i++) {
        tiles.placeOnTile(Player, ph[i])
    }
    controller.moveSprite(Player, 100, 0)
    // #5
    controller.A.onEvent(ControllerButtonEvent.Pressed, function on_a_pressed() {
        
        if (Player.isHittingTile(CollisionDirection.Bottom)) {
            Player.vy = JumpSpeed
            canDoubleJump = true
        } else if (canDoubleJump) {
            Player.vy = JumpSpeed
            canDoubleJump = false
        }
        // #11
    })
}

function EnemySprite() {
    // #6
    Enemy = sprites.create(assets.image`
        Enemy
        `, SpriteKind.Enemy)
    // Enemy.ay = 125
    Enemy.x = 439
    Enemy.y = 168
    Enemy.vx = 75
    // #8
    game.onUpdate(function on_on_update() {
        if (Enemy.isHittingTile(CollisionDirection.Right)) {
            Enemy.vx = -75
        } else if (Enemy.isHittingTile(CollisionDirection.Left)) {
            Enemy.vx = 75
        }
    })
    sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function on_on_overlap(sprite: Sprite, otherSprite: Sprite) {
        game.gameOver(false)
    })
}

function FoodSprite() {
    // #7
    Food = sprites.create(assets.image`
        myImage0
        `, SpriteKind.Food)
    Food.x = 88
    Food.y = 120
    Food.vx = 75
    Food.ay = 2000
    Food.setFlag(SpriteFlag.Ghost, false)
    game.onUpdate(function() {
        if (Food.isHittingTile(CollisionDirection.Right)) {
            Food.vx = -75
        } else if (Food.isHittingTile(CollisionDirection.Left)) {
            Food.vx = 75
        }
    })
    sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function on_on_overlap2(sprite2: Sprite, otherSprite2: Sprite) {
        info.setLife(2)
        otherSprite2.sayText("1 UP")
        pause(500)
        sprites.destroy(otherSprite2)
    })
}

function PowerupBlock() {
   // #12 
    Block2 = sprites.create(assets.image`
        myImage1
        `, SpriteKind.Block)
    Block2.setFlag(SpriteFlag.Ghost, false)
    let ph2 = tiles.getTilesByType(assets.tile`
        myTile
        `)
    for (let j = 0; j < ph2.length; j++) {
        tiles.placeOnTile(Block2, ph2[j])
    }
    sprites.onOverlap(SpriteKind.Player, SpriteKind.Block, function on_on_overlap3(player: Sprite, block: Sprite) {
        if (player.y < block.y && player.vy < 0) {
            sprites.destroy(block, effects.confetti)
            player.ay = 10000
            pause(500)
            player.ay = 125
            tiles.setCurrentTilemap(assets.tilemap`
                level0
                `)
            FoodSprite()
        }
        
    })
}

