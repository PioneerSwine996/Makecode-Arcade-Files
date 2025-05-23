@namespace
class SpriteKind:
    Block = SpriteKind.create()
Player: Sprite = None
Enemy: Sprite = None
Food: Sprite = None
Block2: Sprite = None
Block1: List[Sprite] = []
canDoubleJump = False
Gravity = 125
JumpSpeed = -125
scene.set_tile_map_level(assets.tilemap("""
    level1
    """))
PlayerSprite()
EnemySprite()
PowerupBlock()
scene.camera_follow_sprite(Player)
def PlayerSprite():
    global Player
    Player = sprites.create(assets.image("""
        Player
        """), SpriteKind.player)
    Player.ay = Gravity
    ph = tiles.get_tiles_by_type(sprites.dungeon.collectible_insignia)
    for i in range(len(ph)):
        tiles.place_on_tile(Player, ph[i])
    controller.move_sprite(Player, 100, 0)
    
    def on_a_pressed():
        global canDoubleJump
        if Player.is_hitting_tile(CollisionDirection.BOTTOM):
            Player.vy = JumpSpeed
            canDoubleJump = True
        elif canDoubleJump:
            Player.vy = JumpSpeed
            canDoubleJump = False
    controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)
    
def EnemySprite():
    global Enemy
    Enemy = sprites.create(assets.image("""
        Enemy
        """), SpriteKind.enemy)
    Enemy.ay = 125
    Enemy.x = 80
    Enemy.y = 120
    
    def on_on_update():
        if abs(Enemy.x - Player.x) > 5:
            Enemy.vx = 50 if Enemy.x < Player.x else -50
        else:
            Enemy.vx = 0
    game.on_update(on_on_update)
    
    
    def on_on_overlap(sprite, otherSprite):
        game.game_over(False)
    sprites.on_overlap(SpriteKind.player, SpriteKind.enemy, on_on_overlap)
    
def FoodSprite():
    global Food
    Food = sprites.create(assets.image("""
        myImage0
        """), SpriteKind.food)
    Food.x = 88
    Food.y = 120
    Food.vx = 75
    Food.ay = 2000
    
    def on_on_overlap2(sprite2, otherSprite2):
        info.set_life(2)
        otherSprite2.say_text("1 UP")
        pause(500)
        sprites.destroy(otherSprite2)
    sprites.on_overlap(SpriteKind.player, SpriteKind.food, on_on_overlap2)
    
def PowerupBlock():
    global Block2
    Block2 = sprites.create(assets.image("""
        myImage1
        """), SpriteKind.Block)
    Block2.set_flag(SpriteFlag.GHOST, False)
    ph2 = tiles.get_tiles_by_type(assets.tile("""
        myTile
        """))
    for j in range(len(ph2)):
        tiles.place_on_tile(Block2, ph2[j])
    
    def on_on_overlap3(player, block):
        if player.y < block.y and player.vy < 0:
            sprites.destroy(block, effects.confetti)
            player.ay = 10000
            pause(500)
            player.ay = 125
            tiles.set_current_tilemap(assets.tilemap("""
                level0
                """))
            FoodSprite()
    sprites.on_overlap(SpriteKind.player, SpriteKind.Block, on_on_overlap3)
    