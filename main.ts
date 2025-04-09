let melody: string[] = [
    "E D C D",
    "E E E:8",
    "D D D:8",
    "E G G:8",
    "E D C D",
    "E E E E",
    "D D E D",
    "C:16"


]
for (let i = 0; i < melody.length; i++){
    music.playMelody(melody[i], 80)
}