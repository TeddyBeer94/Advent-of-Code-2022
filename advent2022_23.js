import fs from 'fs';
console.time('\nExecution time')
//const array = fs.readFileSync('example23','utf8').trim().split('\r\n')
const array = fs.readFileSync('adv2022_23_file', 'utf8').trim().split('\n');

const lines = array.map((v,i) => v.split(''))

var map = new Map()
const directions = [0,2,3,1]
var offset = 0

var miny = Infinity
var maxy = -Infinity
var maxx = -Infinity 
var minx = Infinity

const to_key = (({x,y}) => x.toString()+','+y.toString())

const count = ((array_pos,pos) => 
    array_pos.reduce((acc,cur) => {
        if (cur == pos) {acc +=1}
        return acc
    },0) 
)
 
const init = (() => lines.map((v,y) => v.map((w,x) => {
    if (w == '#') {
        map.set(to_key({x,y}),{position : {x :x , y: y} , next : 0})
        if (x > maxx) {maxx = x}
        if (x < minx) {minx = x}
        if (y > maxy) {maxy = y}
        if (y < minx) {miny = y}
    }
})))

init()

// pour afficher l'état du layout 
const disp = (() => {
    let image = ''
    for (let y = miny; y <=maxy ; y++) {
        for (let x = minx ; x <=maxx ; x++) {
            let key = to_key({x,y})
            if(typeof(map.get(key)) == 'undefined') {image += '.'}
            else {image += '#'}
        }
        image += '\n'
    }
    console.log(image)
})

//0 haut, 1 droite, 2 bas , 3 gauche

const check_dir = ((position,dir) => {
    let to_check = []
    if (dir === 3) {to_check = Array.from({length : 3} , (v,i) => 
    ({x : position.x - 1, y : position.y -1 +i}))} 
    if (dir === 2) {to_check = Array.from({length : 3} , (v,i) => 
    ({x : position.x +1 -i, y : position.y +1}))} 
    if (dir === 0) {to_check = Array.from({length : 3} , (v,i) => 
    ({x : position.x + i -1, y : position.y -1}))} 
    if (dir === 1) {to_check = Array.from({length : 3} , (v,i) => 
    ({x : position.x + 1, y : position.y +1-i}))} 

    return to_check.reduce((acc,cur) => {
        if (acc.move == true) {
            if (typeof(map.get(to_key(cur))) != 'undefined') {
                acc.move = false ;  
            }
        }
        return acc
    },{move : true , position : to_check[1]})
})

const no_neighbours = ((position) => {
    let neighbours = [{x : position.x , y : position.y +1},{x : position.x , y : position.y -1},
    {x : position.x +1 , y : position.y },{x : position.x -1, y : position.y},
    {x : position.x -1, y : position.y +1},{x : position.x +1, y : position.y +1},
    {x : position.x -1, y : position.y -1},{x : position.x +1, y : position.y -1}]
    return neighbours.reduce((acc,cur) => {
        if (acc) {
            if (typeof(map.get(to_key(cur))) != 'undefined') {return false}
        }
        return acc
    }, true)
})

const next_move = ((position) => {
    if (no_neighbours(position)) {
        return {move : false, position : position}
    }
    for (let i = 0 ; i <4 ; i++) {
        let next_pos = check_dir(position,directions[(i+offset)%4])
        if (next_pos.move == true) {return next_pos}
    }
    return {move : false, position : position}
})

const round = (() => {
    let nb_moves = 0 ; let next_positions = []
    let values = Array.from(map.values())
    values.map((v) => {
        let next_pos = next_move(v.position)
        v.next = next_pos
        next_positions.push(to_key(v.next.position))
    })
    values.map((v) => {
        if (count(next_positions,to_key(v.next.position)) ==1) {
            if (v.next.move) {
                nb_moves +=1
                if (v.next.position.x > maxx) {maxx = v.next.position.x}
                if (v.next.position.x < minx) {minx = v.next.position.x}
                if (v.next.position.y > maxy) {maxy = v.next.position.y}
                if (v.next.position.y < miny) {miny = v.next.position.y}
                map.delete(to_key(v.position))
                map.set(to_key(v.next.position),{position : v.next.position, next :0})
            }
        }
    })
    offset +=1 ; return nb_moves
})

const count_empty = (() => {
    let sum = 0
    for (let y = miny; y <=maxy ; y++) {
        for (let x = minx ; x <=maxx ; x++) {
            let key = to_key({x,y})
            if(typeof(map.get(key)) == 'undefined') {sum += 1}
        }
    }
    return sum
})    

let moves = Array.from({length : 10}).map(()=> round())
const result1 = count_empty()

const iterate = (() => {
    let i = 11 ; let nb_moves = round() 
    while(nb_moves > 0) {
        i+=1 ; nb_moves = round()
    }
    return i
})
const result2 = iterate()

console.timeEnd('\nExecution time')

console.log(result1)
console.log(result2)
