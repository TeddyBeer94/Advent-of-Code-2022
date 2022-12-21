import fs from 'fs';
console.time('\nExecution time')
//const array = fs.readFileSync('example20','utf8').trim().split('\n')
const array = fs.readFileSync('adv2022_20_file', 'utf8').trim().split('\n');

const input = array.map((v,i) => ({value : Number(v), index : i}))
const start = JSON.parse(JSON.stringify(input))

const n = start.length

const pos_zero = (() =>input.reduce((acc,cur,i) => {
    if (acc == -1) {
        if (cur.value == 0) {return i}
    }
    return acc
},-1))

const find_index = ((element) => input.reduce((acc,cur,i) => {
    if (acc == -1) {
        if (cur.index == element.index) 
            {return i}
    }
    return acc
},-1))

const move = ((element) => {
    let index = find_index(element)
    let new_index = index + (element.value)%(n-1)
    if (new_index >= n) {new_index = new_index +1 -n}  
    if (new_index <= 0) {new_index = new_index +n-1}
    input.splice(index,1)
    input.splice(new_index,0,element)
})

const mix = ((list) => list.map((v) => move(v)))

mix(start)

var z = pos_zero()
const result1 = input[(z+1000)%n].value + input[(z+2000)%n].value + input[(z+3000)%n].value

/** 
const key = 811589153 

start.map((v) => v.value = key * v.value)
console.lo
const start2 = JSON.parse(JSON.stringify(start))
input = start

mix(start2)

z = pos_zero()

const result2 = input[(z+1000)%n].value + input[(z+2000)%n].value + input[(z+3000)%n].value
*/

console.timeEnd('\nExecution time')
console.log(result1)
