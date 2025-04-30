// #7
// ======================= CONSTANTS ======================= \\
// #6
const playerXLocation = 120
const playerYLocation = 80
const ghostenemyHitpoints = 2
const ghostenemyXLocation = 80
const ghostenemyYLocation = 8
const otherenemyHitpoints = 5
const otherenemyXLocation = 40
const otherenemyYLocation = 60
const projectileVelocity = -100
const DamagewithFood = 2
const DamagewithoutFood = 1

// ======================= GLOBAL VARIABLES======================= \\
let player: Sprite = null;
let projectile: Sprite = null;
let food: Sprite = null;
let ghostenemy: EnemySprite = null;
let otherenemy: EnemySprite = null;
let FoodEaten: Boolean = false;

// ======================= NAMESPACES ======================= \\
namespace SpriteKind {
    export const otherEnemy = SpriteKind.create()
}

// ======================= CLASSES ======================= \\
// #4
class EnemySprite extends sprites.ExtendableSprite {
    hitpoints: number
    // #3
    constructor(image: Image, kind: number, hp: number) {
        super(image, kind)
        this.hitpoints = hp
    }

    // #1
    hit(points: number): void {
        this.hitpoints -= points
        if (this.hitpoints <= 0) {
            this.destroy(effects.confetti, 250)
        } else if (this.hitpoints === 1) {
            this.weaken()
        }
    }
    // #5
    weaken(): void {
        this.setImage(assets.image`myImage2`)
    }
}
// ======================= VARIABLE DEFINITION ======================= \\
food = sprites.create(assets.image`myImage3`, SpriteKind.Food);
food.x = randint(8, 140)
food.y = randint(8, 120)
player = sprites.create(assets.image`myImage`, SpriteKind.Player);
player.x = playerXLocation
player.y = playerYLocation
controller.moveSprite(player);
player.setFlag(SpriteFlag.StayInScreen, true);
// ======================= EVENT HANDLERS ======================= \\
game.onUpdateInterval(15000, function () {
    CreateEnemies()
    CreateOtherEnemies()
 })

sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (player: Sprite, food: Sprite) {
    food.destroy()
    FoodEaten = true
})
// #2
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Projectile, function (enemy: EnemySprite, projectile: Sprite) {
    projectile.destroy()
    if (FoodEaten) {
        enemy.hit(DamagewithFood)
    } else {
        enemy.hit(DamagewithoutFood)
    }
})
// #2
sprites.onOverlap(SpriteKind.otherEnemy, SpriteKind.Projectile, function (enemy: EnemySprite, projectile: Sprite) {
    projectile.destroy()
    if (FoodEaten) {
        enemy.hit(DamagewithFood)
    } else {
        enemy.hit(DamagewithoutFood)
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.create(assets.image`myImage0`, SpriteKind.Projectile);
    projectile.setFlag(SpriteFlag.AutoDestroy, true);
    projectile.x = player.x;
    projectile.y = player.y;
    projectile.vy = projectileVelocity;
})
// ======================= FUNCTIONS ======================= \\
function CreateEnemies() {
    ghostenemy =
        new EnemySprite(assets.image`myImage1`, SpriteKind.Enemy, ghostenemyHitpoints) //sprites.create(assets.image`myImage1`, SpriteKind.Enemy);
    ghostenemy.x = ghostenemyXLocation;
    ghostenemy.y = ghostenemyYLocation;
    return ghostenemy
}
function CreateOtherEnemies() {
    otherenemy =
        new EnemySprite(assets.image`myImage1`, SpriteKind.otherEnemy, otherenemyHitpoints)
    otherenemy.x = otherenemyXLocation
    otherenemy.y = otherenemyYLocation
    return otherenemy
}

