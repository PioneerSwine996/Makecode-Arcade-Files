let player: Sprite = null;
let projectile: Sprite = null;
let enemy: Sprite = null;

player = sprites.create(assets.image`myImage`, SpriteKind.Player);
player.x = 120
player.y = 80
controller.moveSprite(player);
player.setFlag(SpriteFlag.StayInScreen, true);

for (let i = 8; i < 160; i += 16){
    enemy = sprites.create(assets.image`myImage1`, SpriteKind.Enemy);
    enemy.x = i;
    enemy.y = 8
}

sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function(sprite: Sprite, otherSprite: Sprite) {
    sprite.destroy()
    otherSprite.destroy()
})

controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.create(assets.image`myImage0`, SpriteKind.Projectile);
    projectile.setFlag(SpriteFlag.AutoDestroy, true);
    projectile.x = player.x;
    projectile.y = player.y;
    projectile.vy = -100;
})

