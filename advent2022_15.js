import fs from 'fs';
console.time('\nPart 1 Execution time')
const array = fs.readFileSync('adv2022_15_file', 'utf8').trim().split('\n');
const lines0 = array.map((v) => ({ 
    Sensor : {
        x : Number(v.split(':')[0].split(',').map((w) => w.split('=')[1])[0]) ,
        y : Number(v.split(':')[0].split(',').map((w) => w.split('=')[1])[1])},
    Beacon : {
        x : Number(v.split(':')[1].split(',').map((w) => w.split('=')[1])[0]) ,
        y : Number(v.split(':')[1].split(',').map((w) => w.split('=')[1])[1])}
    }
))
const max = ((a,b) => {
    if (a >b) {return a}
    return b
})
const n = 2000000
const limit = n*2
const manhattan = (({x,y}) => Math.abs(x) + Math.abs(y))
const lines = lines0.map((v) => ({...v, dist : manhattan({x : v.Sensor.x - v.Beacon.x, y : v.Sensor.y - v.Beacon.y})}))
let map = new Map()

const impossible_Beacon = ((n) => lines.map((v,i) => {
    if (v.Sensor.y- v.dist <= n <= v.Sensor.y +v.dist) {
        let y = n - v.Sensor.y
        for (let x = Math.abs(y)- v.dist; x <= v.dist-Math.abs(y) ; x++) {
            map.set((x+v.Sensor.x),'#')
        }
    }
    if (v.Beacon.y == n) {map.delete(v.Beacon.x)}
    if (v.Sensor.y == n) {map.delete(v.Sensor.x)}
}))

impossible_Beacon(n)
const result1 = map.size

console.timeEnd('\nPart 1 Execution time')
console.log(result1)
console.log("this is likely going to take several minutes")
console.time('\nPart 2 Execution time')

const join_int = (({int_tab ,inf,sup}) => {
    let included = false
    let new_tab = int_tab.map((v) => {
        if (v.inf <= inf && v.sup >= sup) {included = true ;return v}
        if (v.inf -1 <= sup && inf <= v.inf) {
            return {inf : inf , sup : max(v.sup,sup)}
        }
        if (inf -1 <=v.sup && inf >= v.inf) {
            return {inf : v.inf , sup :max(v.sup,sup)}
        }
        return v
    })
    if (JSON.stringify(new_tab) != JSON.stringify(int_tab)) {
        return new_tab
    } 
    if (included) {return new_tab} 
    int_tab.push({inf : inf,sup : sup})
    return int_tab
})

const collapse = ((int_tab) => {
    let start = int_tab
    let x = int_tab.pop();
    let collapsed = join_int({int_tab, ...x})
    while (JSON.stringify(collapsed) != JSON.stringify(start)) {
        start = collapsed
        x = start.pop();
        collapsed = join_int({ int_tab : start, ...x})
    }
    return collapsed
})

const intervals = Array.from({length : limit +1} , () => [])

const mapping2 = (() => lines.map((v) => {
    for (let y = -v.dist ; y<= v.dist ; y++){
        let int = {inf : v.Sensor.x + Math.abs(y)- v.dist , sup : v.Sensor.x + v.dist-Math.abs(y)}
        if (y + v.Sensor.y <= limit && y + v.Sensor.y >=0) {
            intervals[y + v.Sensor.y] = join_int({...int,int_tab : intervals[y + v.Sensor.y]})
            intervals[y + v.Sensor.y] = collapse(intervals[y + v.Sensor.y])
        }
    }
}))

mapping2()
const correct_line = intervals.map((v,i) => 
({last : collapse(v), index :i})).filter(x => x.last.length >= 2)[0]

let x = 0

if (correct_line.last[1].inf - correct_line.last[0].sup == 2) {
    x = correct_line.last[1].inf -1
}
else {
    x = correct_line.last[1].sup +1
}

const result2 = (limit * x) + correct_line.index 
console.timeEnd('\nPart 2 Execution time')
console.log(result2)