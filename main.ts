// ===================== CONSTANTS =====================
const MAX_CHIPS = 5
const SAFE_SPAWN_DISTANCE = 50

// ===================== GLOBAL VARIABLES =====================
let player: Sprite = null
let dataChips: Sprite[] = []
let enemies: Sprite[] = []
let difficulty: number = 1

// ===================== FUNCTIONS =====================

// Create player sprite with higher visibility
function createPlayerSprite(x: number, y: number) {
    player = sprites.create(img`
        . . f f f f . . 
        . f 2 2 2 2 f . 
        f 2 f 2 2 f 2 f 
        f 2 2 2 2 2 2 f 
        f 2 2 2 2 2 2 f 
        f 2 2 2 2 2 2 f 
        . f 2 2 2 2 f . 
        . . f f f f . . 
    `, SpriteKind.Player)
    player.setPosition(x, y)
    controller.moveSprite(player)
    player.setStayInScreen(true)
    animation.runImageAnimation(player, [img`
        . . f f f f . . 
        . f 2 2 2 2 f . 
        f 2 f 2 2 f 2 f 
        f 2 2 2 2 2 2 f 
        f 2 2 2 2 2 2 f 
        f 2 2 2 2 2 2 f 
        . f 2 2 2 2 f . 
        . . f f f f . . 
    `, img`
        . . f f f f . . 
        . f 2 2 2 2 f . 
        f 2 2 2 f 2 2 f 
        f 2 f 2 2 2 f 2 
        f 2 2 2 2 2 2 f 
        f 2 2 2 2 2 2 f 
        . f 2 2 2 2 f . 
        . . f f f f . . 
    `], 200, true)
}

// Check sprite distance
function distanceBetween(a: Sprite, b: Sprite): number {
    return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2)
}

// Spawn enemies safely
function spawnEnemies(count: number) {
    enemies = []
    for (let i = 0; i < count; i++) {
        let enemy: Sprite
        let safe = false
        let attempts = 0

        while (!safe && attempts < 10) {
            enemy = sprites.create(img`
                . . 4 4 4 4 . . 
                . 4 5 5 5 5 4 . 
                4 5 5 5 5 5 5 4 
                4 5 5 5 5 5 5 4 
                4 5 5 5 5 5 5 4 
                4 5 5 5 5 5 5 4 
                . 4 5 5 5 5 4 . 
                . . 4 4 4 4 . . 
            `, SpriteKind.Enemy)
            enemy.setPosition(randint(20, 140), randint(20, 100))

            if (distanceBetween(enemy, player) > SAFE_SPAWN_DISTANCE) {
                safe = true
                enemy.setVelocity(20 + difficulty * 10, 20 + difficulty * 10)
                enemy.setBounceOnWall(true)
                enemies.push(enemy)
            } else {
                enemy.destroy()
                attempts++
            }
        }
    }
}

// Spawn visible data chips
function spawnChips(num: number) {
    dataChips = []
    for (let i = 0; i < num; i++) {
        let chip = sprites.create(img`
            . . b b b b . . 
            . b 9 9 9 9 b . 
            b 9 9 9 9 9 9 b 
            b 9 9 9 9 9 9 b 
            b 9 9 9 9 9 9 b 
            b 9 9 9 9 9 9 b 
            . b 9 9 9 9 b . 
            . . b b b b . . 
        `, SpriteKind.Food)
        chip.setPosition(randint(20, 140), randint(20, 100))
        dataChips.push(chip)
    }
}

function allChipsCollected(): boolean {
    return dataChips.length == 0
}

// Ask for difficulty level
function selectDifficulty() {
    let difficulty = game.askForNumber("Difficulty (1-5)?", 1)
    switch (difficulty) {
        case 1:
            difficulty = 1
            game.splash("Easy Mode")
            break
        case 2:
            difficulty = 2
            game.splash("Medium Mode")
            break
        case 3:
            difficulty = 3
            game.splash("Hard Mode")
            break
        case 4:
            difficulty = 4
            game.splash("Insane Mode")
            break
        case 5:
            difficulty = 5
            game.splash("Nightmare Mode")
            break
        default:
            difficulty = 1
            game.splash("Invalid input — Easy Mode set.")
    }
}

// Start level setup
function startLevel() {
    scene.setBackgroundColor(8) // Dark blue for visibility
    spawnChips(MAX_CHIPS)
    spawnEnemies(difficulty + 1)
    music.playMelody("C5 B A G A B C5 C5 ", 120)
}

// ===================== EVENT HANDLERS =====================

sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (player, chip) {
    chip.destroy()
    dataChips.removeElement(chip)
    info.changeScoreBy(10)

    if (allChipsCollected()) {
        difficulty += 1
        game.splash("Level Up!")
        startLevel()
    }
})

sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (player, enemy) {
    game.over(false, effects.melt)
})

// ===================== GAME START =====================
selectDifficulty()
createPlayerSprite(80, 60)
startLevel()