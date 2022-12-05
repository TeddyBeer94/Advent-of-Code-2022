import fs from 'fs';
console.time('\nExecution time')
const array = fs.readFileSync('adv2022_3_file', 'utf8').split('\n').filter(x => x); 
const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
const arraysplit = array.map((v,i) => ({firsthalf : v.slice(0,v.length/2).split('') , secondhalf : v.slice(v.length/2).split('')}))

const inter = (({firsthalf,secondhalf}) => firsthalf.filter((x) => secondhalf.includes(x)))

const arrayfilter = arraysplit.map((v,i) =>
    ({... v , letter : inter(v)[0]})
)

const value = (char => 1 + alphabet.indexOf(char))
const result1 = arrayfilter.reduce((acc,cur) => acc + value(cur.letter), 0)
console.log(result1)

const a = array.filter((v,i) => i%3==0) 
const arraygroups = a.map((v,i) => ({l1 : array[3*i].split(''), l2 : array[3*i +1].split(''), l3: array[3*i +2].split('')}))

const arrayf = arraygroups.map((v,i) =>
    ({letter : inter({firsthalf : inter({firsthalf : v.l1 , secondhalf : v.l2}) , secondhalf : v.l3})[0]})
)
const result2 = arrayf.reduce((acc,cur) => acc + value(cur.letter), 0)
console.log(result2)
console.timeEnd('\nExecution time')