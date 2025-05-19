let Player: Sprite = null

Player = sprites.create(assets.image`myImage`)
Player.ay = 150
controller.moveSprite(Player, 100, 0)
controller.A.onEvent(ControllerButtonEvent.Pressed, function() {
    if (Player.isHittingTile(CollisionDirection.Bottom)) {
        Player.vy += -125
    }
})
scene.cameraFollowSprite(Player)
scene.setTileMapLevel(assets.tilemap`level`)