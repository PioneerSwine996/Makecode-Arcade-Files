// ================== SpriteKind Extension ==================
namespace SpriteKind {
    export const EnemyProjectile = SpriteKind.create()
}

// ================== Constants ==================
const PLAYER_SPEED = 100
const PLAYER_PROJECTILE_SPEED = -100
const ENEMY_PROJECTILE_SPEED = 50
const ENEMY_SPAWN_INTERVAL = 1500
const POWERUP_DROP_RATE = 0.3
const WAVE_INTERVAL = 15000
const MAX_HEALTH = 5

// ================== Globals ==================
let player: PlayerShip = null
let wave: number = 1

// ================== Classes ==================

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
        this.setPosition(80, 100)
        controller.moveSprite(this, PLAYER_SPEED, 0)
        this.setStayInScreen(true)
        this.health = MAX_HEALTH
    }

    shoot() {
        let projectile = sprites.createProjectileFromSprite(
            img`
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

class EnemyShip extends sprites.ExtendableSprite {
    speed: number

    constructor(x: number, y: number, kind: number) {
        let spriteImage: Image = kind == 0 ? img`
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
        super(img, SpriteKind.Enemy)
        this.setPosition(x, y)
        this.speed = 10 + wave * 2
        this.vy = this.speed
    }

    update() {
        if (Math.percentChance(5 + wave)) {
            this.shoot()
        }
        if (this.y > 110) {
            game.over(false)
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

// ================== Functions ==================

function spawnEnemyWave() {
    for (let i = 0; i < 5 + wave; i++) {
        let x = Math.randomRange(20, 140)
        let y = Math.randomRange(0, 10)
        let type = Math.percentChance(20) ? 1 : 0
        let enemy = new EnemyShip(x, y, type)
    }
    wave++
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

// ================== Event Handlers ==================

controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    player.shoot()
})

sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (projectile, enemy) {
    projectile.destroy()
    enemy.destroy(effects.fire, 100)
    info.changeScoreBy(1);
    (enemy as EnemyShip).onDestroy()
})

sprites.onOverlap(SpriteKind.EnemyProjectile, SpriteKind.Player, function (proj, plyr) {
    proj.destroy();
    (plyr as PlayerShip).takeDamage()
})

sprites.onOverlap(SpriteKind.Food, SpriteKind.Player, function (food, plyr) {
    food.destroy();
    (plyr as PlayerShip).heal()
})

// ================== Main ==================

player = new PlayerShip()
info.setScore(0)

game.onUpdateInterval(ENEMY_SPAWN_INTERVAL, function () {
    for (let sprite of sprites.allOfKind(SpriteKind.Enemy)) {
        (sprite as EnemyShip).update()
    }
})

game.onUpdateInterval(WAVE_INTERVAL, function () {
    spawnEnemyWave()
})

spawnEnemyWave()