// #15
// ======================= GLOBAL VARIABLES======================= \\
let player: Sprite = null;
let projectile: Sprite = null;
let food: Sprite = null;
let ghostenemy: EnemySprite = null;
let otherenemy: EnemySprite = null;
let FoodEaten: Boolean = false;
// ======================= CONSTANTS ======================= \\
// #14
const playerXLocation = 120
const playerYLocation = 80
const ghostenemyHitpoints = 2
const ghostenemyXLocation = 80
const ghostenemyYLocation = 8
const otherenemyHitpoints = 5
const otherenemyXLocation = 40
const otherenemyYLocation = 60
const projectileVelocity = -100
// ======================= NAMESPACES ======================= \\
namespace SpriteKind {
    export const otherEnemy = SpriteKind.create()
}
// ======================= CLASSES ======================= \\
// #7
// #8
class EnemySprite extends sprites.ExtendableSprite {
    hitpoints: number
}
// ======================= VARIABLE DEFINITION ======================= \\
// #12
food = sprites.create(assets.image`myImage3`, SpriteKind.Food);
food.x = randint(8, 140)
food.y = randint(8, 120)
// #1
player = sprites.create(assets.image`myImage`, SpriteKind.Player);
player.x = playerXLocation
player.y = playerYLocation
controller.moveSprite(player);
player.setFlag(SpriteFlag.StayInScreen, true);
// ======================= EVENT HANDLERS ======================= \\
// #4
// #6
game.onUpdateInterval(15000, function () {
    CreateEnemies()
    CreateOtherEnemies()
 })

sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (player: Sprite, food: Sprite) {
    food.destroy()
    FoodEaten = true
})
// #3
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Projectile, function (enemy: EnemySprite, projectile: Sprite) {
    projectile.destroy()
    // #10
    if (FoodEaten) {
        enemy.hitpoints -= 2
    } else {
        enemy.hitpoints--
        if (enemy.hitpoints == 1) {
            // #11
            enemy.setImage(assets.image`myImage2`)
        }
    }
    if (enemy.hitpoints <= 0) {
        enemy.destroy(effects.confetti, 250)
    }
})

sprites.onOverlap(SpriteKind.otherEnemy, SpriteKind.Projectile, function (enemy: EnemySprite, projectile: Sprite) {
    projectile.destroy()
    // #10
    if (FoodEaten) {
        enemy.hitpoints -= 2
    } else {
        enemy.hitpoints--
    }
    if (enemy.hitpoints <= 0) {
        enemy.destroy(effects.confetti, 250)
    }
})
// #2
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.create(assets.image`myImage0`, SpriteKind.Projectile);
    projectile.setFlag(SpriteFlag.AutoDestroy, true);
    projectile.x = player.x;
    projectile.y = player.y;
    projectile.vy = projectileVelocity;
})
// ======================= FUNCTIONS ======================= \\
// #5
function CreateEnemies() {
    ghostenemy =
        new EnemySprite(assets.image`myImage1`, SpriteKind.Enemy) //sprites.create(assets.image`myImage1`, SpriteKind.Enemy);
    // #9
    ghostenemy.hitpoints = ghostenemyHitpoints
    ghostenemy.x = ghostenemyXLocation;
    ghostenemy.y = ghostenemyYLocation;
    return ghostenemy
}
// #13
function CreateOtherEnemies() {
    otherenemy =
        new EnemySprite(assets.image`myImage4`, SpriteKind.otherEnemy)
    otherenemy.hitpoints = otherenemyHitpoints
    otherenemy.x = otherenemyXLocation
    otherenemy.y = otherenemyYLocation
    return otherenemy
}

