let player: Sprite = null
player = sprites.create(assets.image`myImage`, SpriteKind.Player)
controller.moveSprite(player)
scene.cameraFollowSprite(player)
scene.setTileMapLevel(assets.tilemap`level`)