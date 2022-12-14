import fs from 'fs';
console.time('\nExecution time')
const array = fs.readFileSync('adv2022_20_file', 'utf8').trim().split('\n');

var input = array.map((v,i) => ({value : Number(v), index : i}))
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

const key = 811589153 

const start2 = start.map((v) => ({value : v.value * key, index : v.index}))
input= JSON.parse(JSON.stringify(start2))

const final_mix = Array.from({length : 10}).map(() => mix(start2))
z = pos_zero()

const result2 = input[(z+1000)%n].value + input[(z+2000)%n].value + input[(z+3000)%n].value

console.timeEnd('\nExecution time')
console.log(result1)
console.log(result2)