import fs from 'fs';
console.time('\nExecution time')
//const array = fs.readFileSync('example18','utf8').trim().split('\n')
const array = fs.readFileSync('adv2022_18_file', 'utf8').trim().split('\n');

const cubes = array.map((v,i) => ({
    x: Number(v.split(',')[0]),
    y: Number(v.split(',')[1]),
    z: Number(v.split(',')[2].split('\r')[0]), 
    outer : false   
}))

const max_x_y_z = cubes.reduce((acc,cur) => {
    if(cur.x >acc.x) { acc.x = cur.x}
    if(cur.y > acc.y) {acc.y = cur.y}
    if(cur.z > acc .z) {acc.z = cur.z}
    return acc
}, {x: -Infinity,y : -Infinity, z : -Infinity})

const min_x_y_z = cubes.reduce((acc,cur) => {
    if(cur.x <acc.x) { acc.x = cur.x}
    if(cur.y < acc.y) {acc.y = cur.y}
    if(cur.z < acc .z) {acc.z = cur.z}
    return acc
}, {x: Infinity,y : Infinity, z : Infinity})

const map_cubes = new Map()
const to_key = (({x,y,z}) => x.toString()+','+y.toString()+','+z.toString())
const check = ((tile) => {
    if (tile.x +1< min_x_y_z.x || tile.x > max_x_y_z.x +1) {return false}
    if (tile.y +1< min_x_y_z.y || tile.y > max_x_y_z.y +1) {return false}
    if (tile.z +1< min_x_y_z.z || tile.z > max_x_y_z.z +1) {return false}
    return true
})

cubes.map((v) => map_cubes.set(to_key(v),v))

const neighbours = (({x,y,z}) => [{x :x+1,y,z},{x :x-1,y,z},
    {x,y : y + 1,z},{x,y :y-1,z},
    {x,y,z :z+1},{x,y,z: z-1}])    


const set_outer = ((outer_tile) => {
    let correct_neigh = neighbours(outer_tile).filter(x => check(x))
    correct_neigh.map((v) => {
        if (typeof(map_cubes.get(to_key(v)))== 'undefined') {
            map_cubes.set(to_key(v),{outer : true})
            to_visit.push(v)
        }
    })
})

var to_visit = []
const map_outer = (() => {
    to_visit = []
    let start = {x : min_x_y_z.x -1,y : min_x_y_z.y -1,z : min_x_y_z.z -1}
    to_visit.push(start)
    map_cubes.set(to_key(start),{outer : true})
    while (to_visit.length > 0) {
        const outer_tile= to_visit.shift()
        set_outer(outer_tile)
    }
})
const count_sides = (({x,y,z}) => neighbours({x,y,z}).reduce((acc,cur) => {
    if (typeof(map_cubes.get(to_key(cur))) == 'undefined') {return acc +1}
    else {return acc}
}, 0))

const result1 = cubes.reduce((acc,cur) => acc + count_sides(cur), 0)

map_outer()

const count_sides2 = (({x,y,z}) => neighbours({x,y,z}).reduce((acc,cur) => {
    if (typeof(map_cubes.get(to_key(cur))) == 'undefined') {return acc}
    if (map_cubes.get(to_key(cur)).outer == true) {return acc +1}
    return acc
}, 0))

const result2 = cubes.reduce((acc,cur) => acc + count_sides2(cur), 0)

console.timeEnd('\nExecution time')
console.log(result1)
console.log(result2)