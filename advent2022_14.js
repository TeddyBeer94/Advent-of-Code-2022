import fs from 'fs';
console.time('\nExecution time')
const array = fs.readFileSync('adv2022_14_file', 'utf8').trim().split('\n');
const rock_lines = array.map((v) => v.split(' -> ').map((w) => ({
    x : Number(w.split(',')[0]),
    y : Number(w.split(',')[1])
})))

const signe = ((x) => {
    if (x>0) {return 1}
    if (x==0) {return 0}
    if (x<0) {return -1}
})

const minx = rock_lines.reduce((acc,cur) => {
    let x = cur.reduce((acc1,cur1) => {
        if (cur1.x < acc1) {return cur1.x}
        return acc1
    } , Infinity)
    if (x < acc) {return x}
    return acc
},Infinity) 

const maxx = rock_lines.reduce((acc,cur) => {
    let x = cur.reduce((acc1,cur1) => {
        if (cur1.x > acc1) {return cur1.x}
        return acc1
    } , 0)
    if (x > acc) {return x}
    return acc
},0) 

const maxy = rock_lines.reduce((acc,cur) => {
    let x = cur.reduce((acc1,cur1) => {
        if (cur1.y > acc1) {return cur1.y}
        return acc1
    } , 0)
    if (x > acc) {return x}
    return acc
},0) 

var tunnel_map = new Object()

const draw_lines = rock_lines.map((v) => 
    v.reduce((acc,cur) => {
        if (acc != 0) {
            if (cur.x == acc.x) {
                let s = signe(cur.y - acc.y)
                Array.from({length : 1+Math.abs(cur.y - acc.y)},(v,i) => i).map((w) => {
                    tunnel_map[(acc.y + w*s).toString() +','+(cur.x).toString()] = '#' })
            }
            else {
                let s = signe(cur.x - acc.x);
                Array.from({length : 1+Math.abs(cur.x - acc.x)},(v,i) => i).map((w,j) => {
                    tunnel_map[(cur.y).toString() +','+ (acc.x + w*s).toString()] = '#' })
            }
        }
        return cur
    },0))
   
const copy_tunnel = JSON.parse(JSON.stringify(tunnel_map))

const get_tunnel = (({x,y}) => {
    let key =  y.toString() + ',' + x.toString()
    if (key in tunnel_map) {
        return tunnel_map[key]
    }
    if (y == maxy +2) {
        return '#'
    }
    return '.'
})

const move_sand = (({x,y,border}) => {
    if (border && y == maxy) {return 'debordement'}
    if (get_tunnel({x : x, y : y+1}) == '.') {
        tunnel_map[(y+1).toString() +',' + x.toString()] = '+'
        delete tunnel_map[y.toString() +',' + x.toString()]
        return {x : x, y : y+1}
    } else {
        if (border && x == minx) {return 'debordement'}
        if (get_tunnel({x : x-1, y : y+1}) == '.') {
            tunnel_map[(y+1).toString() +',' + (x-1).toString()] = '+'
            delete tunnel_map[y.toString() +',' + x.toString()]
            return {x : x-1, y : y+1}
        }
        else {
            if (border && x == maxx ) {return 'debordement'}
            if (get_tunnel({x : x+1 , y : y+1}) == '.') {
                tunnel_map[(y+1).toString() +',' + (x+1).toString()] = '+'
                delete tunnel_map[y.toString() +',' + x.toString()]
                return {x : x+1, y : y+1}
            }
        }
    }
    tunnel_map[y.toString() +',' + x.toString()] = '0'
    return {x,y}
})

const drop_sand = ((border) => {
    let pos_s = {x : 500, y :0} ; let next_s = move_sand({...pos_s, border : border})
    while (JSON.stringify(pos_s) !== JSON.stringify(next_s)) {
        pos_s = next_s ; next_s = move_sand({...pos_s, border : border})
        if (next_s == 'debordement') {return true}
    }
    return false
})


const all_drops = (() => {
    let stop = false
    let count = 0
    while (stop == false){
        count += 1
        stop = drop_sand(true)
    }
    return count -1
})

const all_drops2 = (() => {
    let count = 0
    while (get_tunnel({x:500, y:0}) != '0'){
        count += 1
        drop_sand(false)
    }
    return count 
})

const result1 = all_drops()
tunnel_map = copy_tunnel
const result2 = all_drops2()

console.timeEnd('\nExecution time')
console.log(result1)
console.log(result2)