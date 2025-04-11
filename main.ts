// #1
let numbers: number[] = [8, 6, 7, 5, 3, 0, 9, 42]
let states: string[] = ["Michigan", "California",
    "Missouri", "Washington",
    "Illinois", "Georgia"
]
console.log("Numbers:")
console.log(numbers)
console.log("States:")
console.log(states)
// #2
function numberSearch(array: number[], searchTerm: number): number {
    for (let i = 0; i < array.length; i++) {
        // #3
        if (array[i] == searchTerm) {
            return array.indexOf(array[i])
        }
    }
    // #4
    return -1
}
console.log(numberSearch(numbers, 3))
// #5
// #6
function arraySearch<T>(array: T[], toFind: T): number {
    for (let i = 0; i < array.length; i++) {
        if (array[i] == toFind) {
            return array.indexOf(array[i])
        }
    }
    return -1
}
console.log(arraySearch(numbers, 5))

states.sort()
console.log("Sorted strings:")
console.log(states)
// #7
numbers.sort()
console.log("Sorted numbers?")
console.log(numbers)
// #8
console.log(numbers.sort(function (value1: number, value2: number): number {
    return value1 - value2
}))

