import fs from 'fs';
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

const arrayfilter2 = arraygroups.map((v,i) =>
    ({... v , letters : inter({firsthalf : v.l1 , secondhalf : v.l2})})
)

const arrayfilter3 = arrayfilter2.map((v,i) =>
    ({... v , letter : inter({firsthalf : v.letters , secondhalf : v.l3})[0]})
)
const result2 = arrayfilter3.reduce((acc,cur) => acc + value(cur.letter), 0)
console.log(result2)