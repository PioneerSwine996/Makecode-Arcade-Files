// ===================== CONSTANTS ===================== \\ 
const MAX_CHIPS = 5
const SAFE_SPAWN_DISTANCE = 50

// ===================== GLOBAL VARIABLES ===================== \\ 
let player: Sprite = null
let dataChips: Sprite[] = []
let enemies: Sprite[] = []
let difficulty: number = 1
let points: number = null
let x: number = null
let y: number = null

// ===================== FUNCTIONS ===================== \\ 
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
    scene.cameraFollowSprite(player)
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
        f 2 2 2 2 2 2 f 
        f 2 2 2 2 2 2 f 
        f 2 2 2 2 2 2 f 
        f 2 2 2 2 2 2 f 
        . f 2 2 2 2 f . 
        . . f f f f . . 
    `], 200, true)
}

function distanceBetween(a: Sprite, b: Sprite): number {
    return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2)
}

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
                enemy.setVelocity(20 + difficulty * 20, 20 + difficulty * 20)
                enemy.setBounceOnWall(true)
                enemies.push(enemy)
            } else {
                enemy.destroy()
                attempts++
            }
        }
    }
}

function spawnChips(num: number) {
    dataChips = []
    for (let i = 0; i < num; i++) {
        let chip = sprites.create(sprites.builtin.coin0, SpriteKind.Food)
        animation.runImageAnimation(
            chip,
            assets.animation`myAnim`,
            200,
            true
        )
        x = randint(6, 250)
        y = randint(6, 180)
        tiles.placeOnRandomTile(chip, sprites.dungeon.darkGroundCenter)


        // chip.setPosition(165, 165)
        // // top y = 75
        // // bottom y = 165
        // // left x = 91
        // // right x = 165
        dataChips.push(chip)
    }
}

function allChipsCollected(): boolean {
    return dataChips.length == 0
}

function selectDifficulty() {
    difficulty = game.askForNumber("Difficulty (1-5)?", 1)
    switch (difficulty) {
        case 0:
            difficulty = 0
            points = 10
            game.splash("Collect orbs to move up to higher levels")
            break
        case 1:
            difficulty = 1
            points = 10
            game.splash("Easy Mode")
            break
        case 2:
            difficulty = 2
            points = 10
            game.splash("Medium Mode")
            break
        case 3:
            difficulty = 3
            points = 10
            game.splash("Hard Mode")
            break
        case 4:
            difficulty = 4
            points = 10
            game.splash("Insane Mode")
            break
        case 5:
            difficulty = 5
            points = 10
            game.splash("Nightmare Mode")
            break
        default:
            difficulty = 0
            points = 10
            game.splash("Invalid input. Tutorial Started.")
    }
}

function startLevel() {
    tiles.setTilemap(tilemap`level`)
    spawnChips(MAX_CHIPS)
    spawnEnemies(difficulty + 1)
}

// ===================== EVENT HANDLERS ===================== \\ 

sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (player, chip) {
    chip.destroy()
    dataChips.removeElement(chip)
    info.changeScoreBy(points * difficulty)

    if (allChipsCollected()) {
        difficulty += 1
        game.splash("Level Up!")
        startLevel()
    }
})

sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (player, enemy) {
    game.over(false, effects.melt)
})


// ===================== GAME START ===================== \\ 
selectDifficulty()
createPlayerSprite(120, 60)
startLevel()