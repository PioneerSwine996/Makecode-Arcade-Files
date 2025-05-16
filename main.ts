let player: Sprite = null
let enemy: Sprite = null
let food: Sprite = null

const EnemySpeed: number = 60
const EnemyHitsPlayer: number = -1
const PlayerEatsFood: number = 1
const cameraShakeIntensity: number = 2

player = sprites.create(assets.image`myImage`, SpriteKind.Player)
controller.moveSprite(player)
scene.cameraFollowSprite(player)
enemy = sprites.create(assets.image`myImage0`, SpriteKind.Enemy)
food = sprites.create(assets.image`myImage1`, SpriteKind.Food)
tiles.setCurrentTilemap(assets.tilemap`level`)
info.setLife(2)
SpawnPlayer()
SpawnEnemy()
SpawnFood()
Animation()
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Player, function(sprite: Sprite, otherSprite: Sprite) {
    sprite.destroy()
    info.changeLifeBy(EnemyHitsPlayer)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function(sprite: Sprite, otherSprite: Sprite) {
    otherSprite.destroy()
    info.changeLifeBy(PlayerEatsFood)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile`, function (sprite: Sprite, location: tiles.Location) {
        scene.cameraShake(cameraShakeIntensity)
})
function SpawnPlayer() {
    let ph = tiles.getTilesByType(sprites.dungeon.darkGroundNorthWest0)
    for (let i=0; i<ph.length; i++) {
        tiles.placeOnTile(player, ph[i])
    }
}
function SpawnEnemy() {
    let ph = tiles.getTilesByType(sprites.dungeon.darkGroundNorthEast0)
    for (let i=0; i<ph.length; i++) {
        tiles.placeOnTile(enemy, ph[i])
    }
    enemy.follow(player, EnemySpeed)
}
function SpawnFood() {
    let ph = tiles.getTilesByType(sprites.dungeon.darkGroundSouthWest0)
    for (let i=0; i<ph.length; i++) {
        tiles.placeOnTile(food, ph[i])
    }
}
function Animation() {
    characterAnimations.loopFrames(
        player, [
            sprites.castle.heroWalkFront1,
            sprites.castle.heroWalkFront2,
            sprites.castle.heroWalkFront3,
            sprites.castle.heroWalkFront4        
    ], 200, characterAnimations.rule(Predicate.MovingDown))

    characterAnimations.loopFrames(
        player, [
            sprites.castle.heroWalkSideLeft1,
            sprites.castle.heroWalkSideLeft2,
            sprites.castle.heroWalkSideLeft3,
            sprites.castle.heroWalkSideLeft4        
    ], 200, characterAnimations.rule(Predicate.MovingLeft))

    characterAnimations.loopFrames(
        player, [
            sprites.castle.heroWalkSideRight1,
            sprites.castle.heroWalkSideRight2,
            sprites.castle.heroWalkSideRight3,
            sprites.castle.heroWalkSideRight4        
    ], 200, characterAnimations.rule(Predicate.MovingRight))
    
    characterAnimations.loopFrames(
        player, [
            sprites.castle.heroWalkBack1,
            sprites.castle.heroWalkBack2,
            sprites.castle.heroWalkBack3,
            sprites.castle.heroWalkBack4        
        ], 200, characterAnimations.rule(Predicate.MovingUp))
}