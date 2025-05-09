// #9
// ================== SpriteKind Extension ==================
namespace SpriteKind {
    export const EnemyProjectile = SpriteKind.create()
}
// #10
// ================== Constants ==================
const PLAYER_SPEED = 125
const PLAYER_PROJECTILE_SPEED = -100
const ENEMY_PROJECTILE_SPEED = 50
const ENEMY_SPAWN_INTERVAL = 1500
const POWERUP_DROP_RATE = 0.3
const WAVE_INTERVAL = 10000
const MAX_HEALTH = 5
// #11
// ================== Globals ==================
let player: PlayerShip = null
let wave: number = 1
let enemyArray: EnemyShip[] = []
// #12
// ================== Classes ==================
// #1
// #2
// #3
class PlayerShip extends sprites.ExtendableSprite {
    health: number

    constructor() {
        super(img`
            . . . . 5 5 5 . . . . .
            . . . 5 5 5 5 5 . . . .
            . . 5 5 1 5 1 5 5 . . .
            . . 5 5 5 5 5 5 5 . . .
            . . . 5 5 5 5 5 . . . .
            . . . . 5 . 5 . . . . .
        `, SpriteKind.Player)
        this.setPosition(this.x, screen.height - this.height / 2)
        controller.moveSprite(this, PLAYER_SPEED, 0)
        this.setStayInScreen(true)
        this.health = MAX_HEALTH
    }

    shoot() {
        let projectile = sprites.createProjectileFromSprite(
            img `
                . . 2 . .
                . 2 2 2 .
                . . 2 . .
            `,
            this,
            0,
            PLAYER_PROJECTILE_SPEED
        )
        projectile.setKind(SpriteKind.Projectile)
    }

    takeDamage() {
        this.health--
        updateHealthBar(this.health)
        if (this.health <= 0) {
            game.over(false)
        }
    }

    heal() {
        if (this.health < MAX_HEALTH) {
            this.health++
            updateHealthBar(this.health)
        }
    }
}
// #5
// #6
// #7
// #8
class EnemyShip extends sprites.ExtendableSprite {
    speed: number
    cooldown: number
    hasHitBottom: boolean 

    constructor(x: number, y: number, kind: number) {
        let spriteImageEnemy: Image = kind == 0 ? img`
            . . . c c c . . .
            . c c d d d c c .
            c d d d d d d d c
            c d d d d d d d c
            . c d d d d d c .
            . . c c c c c . .
        ` : img`
            . . 8 8 8 . .
            . 8 f f f 8 .
            8 f f f f f 8
            . 8 f f f 8 .
            . . 8 8 8 . .
        `
        super(spriteImageEnemy, SpriteKind.Enemy)
        this.setPosition(x, y)
        this.speed = 10 + wave * 2
        this.vy = this.speed
    }
    
    update(dt: number) {
        if (this.cooldown > 0) {
            this.cooldown--
        } else {
            if (Math.percentChance(5 + wave)) {
                this.shoot()
            }
            this.cooldown = Math.randomRange(20, 40)
        }
    
        if (!this.hasHitBottom && this.y > screen.height - this.height / 2) {
            this.hasHitBottom = true
        
            // if (this.kind = () => SpriteKind.Enemy) {
                player.takeDamage()
            // }
            this.destroy(effects.disintegrate, 100)
        }
     }

    shoot() {
        let proj = sprites.createProjectileFromSprite(
            img`
                . . 1 . .
                . 1 1 1 .
                . . 1 . .
            `,
            this,
            0,
            ENEMY_PROJECTILE_SPEED
        )
        proj.setKind(SpriteKind.EnemyProjectile)
    }

    onDestroy() {
        if (Math.percentChance(POWERUP_DROP_RATE * 100)) {
            let powerup = sprites.create(img`
                . . 4 4 4 . .
                . 4 5 5 5 4 .
                4 5 5 5 5 5 4
                . 4 5 5 5 4 .
                . . 4 4 4 . .
            `, SpriteKind.Food)
            powerup.setPosition(this.x, this.y)
            powerup.setVelocity(0, 30)
        }
    }
}
// #13
// ================== Functions ==================

function spawnEnemyWave() {
    // for (let i = 0; i < 5 + wave; i++) {
    //     let x = Math.randomRange(20, 140)
    //     let y = Math.randomRange(0, 10)
    //     let type = Math.percentChance(20) ? 1 : 0
    //     let enemy = new EnemyShip(x, y, type)
    // }
    // wave++
    let out_of_screen = false
    let type = Math.percentChance(20) ? 1 : 0
for (let i = 8; i < 56; i += 16) {
    for (let j = 8; j < 144; j += 16) {
        let enemy = new EnemyShip(j, i, type)
        enemy.setVelocity(10, 0)
        enemyArray.push(enemy)
        game.onUpdate(function () {
            out_of_screen = false
            for (let h = 0; h < enemyArray.length; h++) {
                if (enemyArray[h].x > 160) {
                    out_of_screen = true
                    enemy.setVelocity(-10, 0)
                } else if (enemyArray[h].x  < 0) {
                    out_of_screen = true
                    enemy.setVelocity(10, 0)
                } else {
                    out_of_screen = false
                }

                if (out_of_screen == true){
                    enemy.y += 0.5
                }

                if (enemyArray[h].y > 114){
                    game.gameOver(true)
                }
            }

        })
    }
}
    info.setScore(info.score() + 10)
}

function updateHealthBar(hp: number) {
    statusbar.value = hp * 20
}

// ================== UI Elements ==================
let statusbar = statusbars.create(20, 4, StatusBarKind.Health)
statusbar.setColor(7, 2)
statusbar.setLabel("HP")
statusbar.max = MAX_HEALTH * 20
statusbar.value = MAX_HEALTH * 20
statusbar.setPosition(20, 10)
// #14
// ================== Event Handlers ==================

controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    player.shoot()
})

sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (projectile, enemy:EnemyShip) {
    projectile.destroy()
    enemy.destroy(effects.fire, 100)
    enemyArray.removeElement(enemy)
    info.changeScoreBy(1);
    (enemy as EnemyShip).onDestroy()
})

sprites.onOverlap(SpriteKind.EnemyProjectile, SpriteKind.Player, function (proj, plyr: PlayerShip) {
    proj.destroy();
    plyr.takeDamage()
})

sprites.onOverlap(SpriteKind.Food, SpriteKind.Player, function (food, plyr: PlayerShip) {
    food.destroy();
    plyr.heal()
})
// #15
// ================== Main ==================
// #4
player = new PlayerShip()
info.setScore(0)

game.onUpdate(function () {
    if (enemyArray.length <= 0) {
        for (let sprite of sprites.allOfKind(SpriteKind.Enemy)) {
            (sprite as EnemyShip).update(10)
        }
    }
})

game.onUpdate(function () {
    if (enemyArray.length <= 0) {
        spawnEnemyWave()
    }
})

game.onUpdate(function () {
    for (let food of sprites.allOfKind(SpriteKind.Food)) {
        if (food.y > screen.height) {
            food.destroy()
        }
    }
})

spawnEnemyWave()