import fs from 'fs';
console.time('\nPart 1 Execution time')
const array = fs.readFileSync('adv2022_6_file', 'utf8').split('')
const a1 = array.map((v,i) => {
    if (i>2) {
        let x = new Set(array.slice(i-3,i+1))
        return { nbchar : x.size, index : i+1}
        }
}).filter(x => x)
console.log(a1.filter(x => x.nbchar ==4)[0].index)

console.timeEnd('\nPart 1 Execution time')

console.time('\nPart 2 Execution time')

const a2 = array.map((v,i) => {
    if (i>12) {
        let x = new Set(array.slice(i-13,i+1))
        return { nbchar : x.size, index : i+1}
        }
}).filter(x => x)
console.log(a2.filter(x => x.nbchar ==14)[0].index)
console.timeEnd('\nPart 2 Execution time')