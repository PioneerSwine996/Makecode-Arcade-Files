function changeGreeting(): void {
    let greeting = `Salut à tous !`
    let letters: number = 0
    findLength(greeting)
}
function findLength(name: string) {
    let letters: number = name.length
}
let greeting: string = `Hello, World!`
let DuckSprite: Sprite = sprites.create(sprites.duck.duck6, SpriteKind.Player)
changeGreeting()
DuckSprite.say(greeting)
