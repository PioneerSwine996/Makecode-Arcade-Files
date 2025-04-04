function changeGreeting(): void {
    greeting = `Salut à tous !`
}
let greeting: string = `Hello, World!`
let DuckSprite: Sprite = sprites.create(sprites.duck.duck6, SpriteKind.Player)
changeGreeting()
DuckSprite.say(greeting)