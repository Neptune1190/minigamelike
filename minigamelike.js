/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: minigamelike
@author: Neptune1190
@tags: [Minigames]
@addedOn: 2024-00-00
*/

const cursor = "c"
const wall = "w"
const maze = "m"
const pickup = "p"
const dice = "d"
const jigsaw = "j"
const grass = "g"
const player = "i"
const goal = "q"
setLegend(
  [ cursor, bitmap`
3333........3333
33............33
3..............3
3..............3
................
................
................
................
................
................
................
................
3..............3
3..............3
33............33
3333........3333` ],
  [ wall, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000` ],
  [ maze, bitmap`
7777777777777777
7777722227772227
7722227727272727
7727727722272722
7727777777722727
2222222277777727
7727277272222727
7727227222772727
7727772277722727
7727777777727727
7727777777722227
7727222722277727
7722272727272727
7777772227222727
7777777777777227
7777777777777777` ],
  [ pickup, bitmap`
...6666666666...
..666660066666..
..666660066666..
..666660066666..
..666660066666..
..666660066666..
..666660066666..
..666660066666..
..666660066666..
..666660066666..
..666660066666..
..666660066666..
..666660066666..
..666660066666..
..666666666666..
...6666666666...` ],
  [ dice, bitmap`
6666666666666666
6000000000000006
6000000000000006
6000000000000006
6000000000000006
6000000000000006
6000002222000006
6000002222000006
6000002222000006
6000002222000006
6000000000000006
6000000000000006
6000000000000006
6000000000000006
6000000000000006
6666666666666666` ],
  [ jigsaw, bitmap`
5555555555555555
5555555555555555
5555558888555555
5558888888888555
5558888888888555
5558888888888555
5558888888888855
5558888888888855
5558888888888855
5558888888888855
5558888888888555
5558888888888555
5558888888888555
5555555555555555
5555555555555555
5555555555555555` ],
  [ grass, bitmap`
DDDDDDDDD4DDDDDD
DDDDDDDD4DDDDD4D
DD4DDDDDDDDDDDDD
DDDD4DDDDDDDDDDD
DDDDDDDDDDDDDD4D
DD4DDD4DDD4DDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDD4DDD
DDD4D4DDDDDDDDDD
DDDDDDDD4DDDDDDD
DDDDDDDDDDDDDDDD
DDD4DDDDDDD4DDDD
DDDDDD4D4DDDDDD4
DDDDDDDDDDDDDDDD
DDDDDDDDDDD4DDDD
DDDD4DDDDDDDDDDD` ],
  [ player, bitmap`
................
.....666666.....
....66666666....
....66066066....
....66666666....
....66066066....
....66000066....
.....666666.....
.......0........
.......0........
.......0........
....00000000....
.......0........
.......0........
......000.......
.....00.00......` ],
  [ goal, bitmap`
6666666666666666
6666666666666666
6660066666600666
6660066666600666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6660666666660666
6660666666660666
6660666666660666
6660666666660666
6660666666660666
6660000000000666
6666666666666666
6666666666666666` ],
)

setSolids([wall, grass, cursor, player])

let level = 0
const levels = [
  map`
wwwww
wwwww
wpj.w
wmd.w
w...w
wwwww`, //menu
  map`
.........
.........
.........
.........
.........
.........
....i....
ggggggggg`, //coins
  map`
.w......
.w.ww.w.
.w.wwww.
i..wqw..
.w.w...w
.w.wwwww
.w.w...w
.w...w.w`, //maze
  map`
........
........
........
........
........
........
........
........`, //to be determined
]

setMap(levels[level])

setPushables({

})
if (level == 0) {
  addSprite(getFirst(dice).x, getFirst(dice).y, cursor)
  addText("Pick a game", { 
  x: 4,
  y: 4,
  color: color`2`
})} else {
  getFirst(cursor).remove
}
onInput("w", () => {
  if (level == 0) {
    getFirst(cursor).y -= 1
  } else if (level != 0) {
    getFirst(player).y -= 1
  }
})
onInput("a", () => {
  if (level == 0) {
    getFirst(cursor).x -= 1
  } else if (level != 0) {
    getFirst(player).x -= 1
  }
})
onInput("s", () => {
  if (level == 0) {
    getFirst(cursor).y += 1
  } else if (level != 0) {
    getFirst(player).y += 1
  }
})
onInput("d", () => {
  if (level == 0) {
    getFirst(cursor).x += 1
  } else if (level != 0) {
    getFirst(player).x += 1
  }
})
onInput("k", () => {
  if (level == 0) {
  if (getFirst(cursor).x == 1 && getFirst(cursor).y == 2) {
    level = 1
    setMap(levels[level])
    } else if (getFirst(cursor).x == 1 && getFirst(cursor).y == 3) {
      level = 2
      setMap(levels[level])
    }
   }
})


afterInput(() => {
  if (level != 0) {
  clearText()
}
  if (tilesWith(goal, player).length == 1) {
  level = 0
  setMap(levels[level])
  addSprite(getFirst(dice).x, getFirst(dice).y, cursor)
}
  
})