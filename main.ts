// #5
function changeGreeting(name: string) {
    let greeting = `Salut à tous !`
    let howlong: string = null
    let letters: number = 0
    letters = name.length
    // #2
    findLength(name)
    // #3
    if (letters < 5) {
        howlong = "Short " + letters
    } else {
        howlong = "Long " + letters
    }
    return howlong
}
// #1
function findLength(name: string) {
    let letters: number = 0
    letters = name.length
}
// let greeting: string = `Hello, World!`
let DuckSprite: Sprite = sprites.create(sprites.duck.duck6, SpriteKind.Player)
// #4
DuckSprite.say(changeGreeting("Monkey"))
