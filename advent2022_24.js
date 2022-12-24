import fs from 'fs';
console.time('\nExecution time')
const array = fs.readFileSync('adv2022_24_file', 'utf8').trim().split('\n');
const map = array.map((v) => v.split(''))

const to_key = (({x,y}) => x.toString()+','+y.toString())
const layout = new Map()
var blizzards = []
const h = map.length
const width = map[0].length
const start = {x : 1, y : 0}
const end = {x : width -2,y : h -1 }

map.map((v,y) => v.map((w,x) => {
    if (['>','<','^','v'].includes(w)) {blizzards.push({x : x , y : y, dir : w})}
    if (w != '.') {layout.set(to_key({x,y}),w)}
}))

//to prevent the player from esacping the maze from the top or bottom
layout.set(to_key({x : start.x ,y : start.y-1}),'#')
layout.set(to_key({x : end.x , y : end.x +1}),'#')

//returns a blizzard's next position
const move_blizz = ((blizzard) => {
    if (blizzard.dir == '>') {let next = {x : blizzard.x +1 , y : blizzard.y , dir : blizzard.dir} 
        if (next.x >= width-1) {next.x = 1}
        return next}
    if (blizzard.dir == '^') {let next = {x : blizzard.x , y : blizzard.y -1, dir : blizzard.dir} 
        if (next.y == start.y && next.x != start.x) {next.y = h-2}
        return next}
    if (blizzard.dir == '<') {let next = {x : blizzard.x -1 , y : blizzard.y , dir : blizzard.dir} 
        if (next.x == 0) {next.x = width -2}
        return next}
    if (blizzard.dir == 'v') {let next = {x : blizzard.x , y : blizzard.y +1, dir : blizzard.dir} 
        if (next.y == end.y && next.x != end.x) {next.y = 1}
        return next}
})

const update_layout = (() => {
    let next_blizz = blizzards.map((v)=> {
        layout.delete(to_key(v)) ; return move_blizz(v)
    })
    next_blizz.map((v) => layout.set(to_key(v),v.dir))
    blizzards = next_blizz
})

//return new possible positions at minute n+1 given a position at minute n 
const new_states = ((position) => {
    let next_positions = [position , {x : position.x , y : position.y +1},
    {x : position.x , y : position.y -1},{x : position.x +1, y : position.y},
    {x : position.x-1 , y : position.y}]
    return next_positions.filter(x => typeof(layout.get(to_key(x))) == 'undefined')
})

//return all possible positions at minute n+1 given all possible positions at minute n
const all_new_positions = ((positions) => positions.reduce((acc,cur) => {
    let next = new_states(cur)
    next.map((v)=> acc.add(to_key(v)))
    return acc
}, new Set()))

// moves the blizzards and returns new possible positions
const minute = ((positions) => {
    update_layout()
    return Array.from(all_new_positions(positions)).map((v) => 
    ({x : Number(v.split(',')[0]), y : Number(v.split(',')[1])}))
})

const check_end = ((positions,end) => positions.reduce((acc,cur) => {
    if (cur.x === end.x && cur.y === end.y) {return true}
    return acc
},false))

const journey = ((start,end) => {
    let i = 0 ; let positions = [start]
    while (check_end(positions,end)== false) {
        positions = minute(positions)
        i +=1   
    }
    return i
})

const result1 = journey(start,end)
const length_trip_back = journey(end, start)
const length_return = journey(start,end)
const result2 = result1 + length_trip_back + length_return

console.timeEnd('\nExecution time')
console.log(result1)
console.log(result2)