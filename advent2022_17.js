import fs from 'fs';
console.time('\nExecution time')
const jet_pattern = fs.readFileSync('example','utf8').trim().split('')
//const jet_pattern = fs.readFileSync('adv2022_17_file', 'utf8').trim().split('');

let bloc_types = [Array.from({length : 4},(v,i) => ({x : i, y : 0})),
[{x : 0 , y :1}, {x : 1 , y :1},{x : 2 , y :1},{x : 1 , y :2},{x : 1 , y :0}],
[{x : 0 , y :0}, {x : 1 , y :0},{x : 2 , y :0},{x : 2 , y :1},{x : 2 , y :2}],
Array.from({length : 4}, (v,i) => ({x : 0 , y :i})),
[{x : 0 , y :0}, {x : 0 , y :1},{x : 1 , y :1},{x : 1 , y :0}]]

var layout = new Map()
var height = 0
var current_jet = -1
const n = jet_pattern.length

const to_key = (({x,y}) => x.toString()+','+y.toString())

// position est la position du "coin inferieur gauche" du bloc 
const is_valid = ((position, bloc_type) => bloc_type.reduce((acc,cur) => {
    if (acc) {
        let tile = {x : position.x + cur.x , y : position.y + cur.y}
        if (tile.y < 0) {return false}
        if (tile.x > 6 || tile.x < 0) {return false}
        let key = to_key(tile)
        if (layout.get(key) == '#') {return false}
    }
    return acc
}, true))

// pour afficher l'état du layout 
const disp = (() => {
    let image = ''
    for (let y = height-1 ; y >=0 ; y--) {
        for (let x = 0 ; x <=6 ; x++) {
            let key = to_key({x,y})
            if(typeof(layout.get(key)) == 'undefined') {image += '.'}
            else {image += layout.get(key)}
        }
        image += '\n'
    }
    console.log(image)
})

const jet_push = ((pos, bloc_type) => {
    current_jet +=1
    switch (jet_pattern[current_jet%n]) {
        case '<' :  if (is_valid({x : pos.x -1 , y : pos.y},bloc_type)) {
            return {x : pos.x -1 , y : pos.y} 
        }
        else {return pos}
        case '>' : if (is_valid({x : pos.x +1 , y : pos.y},bloc_type)) {
            return {x : pos.x +1 , y : pos.y}
        }
        else {return pos}
    }
})

const fall = ((bloc_type) => {
    let pos = {x :2 , y :3 + height}
    let next_pos = {x :2 , y :3 + height}
    while(is_valid(next_pos,bloc_type)) {
        next_pos = jet_push(next_pos, bloc_type)
        pos = {x : next_pos.x , y : next_pos.y}
        next_pos.y = next_pos.y -1
    }
    bloc_type.map((v) => {
        let tile = {x : v.x + pos.x , y : v.y + pos.y}
        layout.set(to_key(tile),'#')
        if (tile.y +1 > height) {height = tile.y +1}
    })
})

const allfalls = ((nb_blocks) => {
    height = 0
    current_jet = -1
    layout = new Map()
    for (let i = 0 ; i < nb_blocks; i++) {
        let bloc_type = bloc_types[i%5]
        fall(bloc_type)
    }
})

allfalls(80)
disp()

console.timeEnd('\nExecution time')
console.log(height)

